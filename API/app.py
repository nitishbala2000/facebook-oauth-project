from flask import jsonify, request, Flask
import os
import requests
import jwt
import mysql.connector
import time

app = Flask(__name__)



def getUserIds():
    db = mysql.connector.connect(
        host=os.environ["DB_HOST"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        database=os.environ["DB_DATABASE"]
    )

    sql = "SELECT id FROM users"
    cursor = db.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()
    output = set()
    for row in results:
        output.add(row[0])

    return output

def addUser(userId, name, email):
    db = mysql.connector.connect(
        host=os.environ["DB_HOST"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        database=os.environ["DB_DATABASE"]
    )
    cursor = db.cursor()
    sql = f"INSERT INTO users VALUES (%s, %s, %s, '')"
    val = (userId, name, email)
    cursor.execute(sql, val)
    db.commit()

def getUser(id):
    db = mysql.connector.connect(
        host=os.environ["DB_HOST"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        database=os.environ["DB_DATABASE"]
    )

    cursor = db.cursor()
    sql = "SELECT * FROM users WHERE id=%s"
    val = (id,)
    cursor.execute(sql, val)
    row = cursor.fetchone()
    return {
        "id" : row[0],
        "name" : row[1],
        "email" : row[2],
        "extraInfo" : row[3]
    }



@app.route("/getJwtToken", methods=["POST"])
def getJwtToken():

    args = request.get_json()
    accessToken = args["token"]
    print(args)
    userId = args["id"]
    url = f"https://graph.facebook.com/{userId}?fields=id,name,email&access_token={accessToken}"
    response = requests.get(url).json()
    
    userId = response["id"]
    name = response["name"]
    email = response["email"]

    registeredIds = getUserIds()
    if userId not in registeredIds:
        addUser(userId, name, email)

    
    encodedJwt = jwt.encode({"id" : userId, "expiryTime" : time.time() + 3600}, "secret", algorithm="HS256")
    return encodedJwt

@app.route("/getUserInfo", methods=["GET"])
def getUserInfo():
    print(request.args)
    encodedJwt = request.args["jwtToken"]
    decoded = jwt.decode(encodedJwt, key="secret", algorithms=["HS256"])
    userId = decoded["id"]
    return jsonify(getUser(userId))