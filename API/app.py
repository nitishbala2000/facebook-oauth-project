from flask import jsonify, request, Flask
import os
import requests
import jwt
import mysql.connector
import time

app = Flask(__name__)

def getDBConnection():
    return  mysql.connector.connect(
                host=os.environ["DB_HOST"],
                user=os.environ["DB_USER"],
                password=os.environ["DB_PASSWORD"],
                database=os.environ["DB_DATABASE"])



def getUserIds():
    db = getDBConnection()
    sql = "SELECT id FROM users"
    cursor = db.cursor()
    cursor.execute(sql)
    results = cursor.fetchall()
    output = set()
    for row in results:
        output.add(row[0])

    return output

def addUser(userId, name, email):
    db = getDBConnection()
    cursor = db.cursor()
    sql = f"INSERT INTO users VALUES (%s, %s, %s, '')"
    val = (userId, name, email)
    cursor.execute(sql, val)
    db.commit()

def getUser(id):
    db = getDBConnection()
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

def updateInfo(id, newValue):
    db = getDBConnection()
    cursor = db.cursor()
    sql = "UPDATE users SET extraInfo = %s WHERE id = %s"
    val = (newValue, id)
    cursor.execute(sql, val)
    db.commit()



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

    
    #The token will expire in 900 seconds i.e. 15 minutes
    encodedJwt = jwt.encode({"id" : userId, "expiryTime" : time.time() + 900}, os.environ["JWT_KEY"], algorithm=os.environ["JWT_ALGORITHM"])
    return encodedJwt

@app.route("/getUserInfo", methods=["GET"])
def getUserInfo():
    print(request.args)
    encodedJwt = request.args["jwtToken"]
    decoded = jwt.decode(encodedJwt, key=os.environ["JWT_KEY"], algorithms=os.environ["JWT_ALGORITHM"])
    userId = decoded["id"]
    expiryTime = decoded["expiryTime"]

    if time.time() > expiryTime:
        #token expired
        return "Token expired", 400

    return jsonify(getUser(userId))


@app.route("/updateExtraInfo", methods=["POST"])
def updateExtraInfo():
    args = request.get_json()
    encodedJwt = args["jwtToken"]
    newExtraInfo = args["extraInfo"]
    decoded = jwt.decode(encodedJwt, key=os.environ["JWT_KEY"], algorithms=os.environ["JWT_ALGORITHM"])
    id = decoded["id"]
    expiryTime = decoded["expiryTime"]

    if time.time() > expiryTime:
        #token expired
        return "Token expired", 400


    updateInfo(id, newExtraInfo)
    return "OK"