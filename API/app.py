from flask import jsonify, request, Flask
import os

import mysql.connector

app = Flask(__name__)

db = mysql.connector.connect(
    host=os.environ["DB_HOST"],
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    database=os.environ["DB_DATABASE"]
)


@app.route("/test", methods=["GET"])
def test():



    sql = "SELECT * FROM users"

    cursor = db.cursor()

    cursor.execute(sql)

    res = cursor.fetchall()

    for row in res:
        print(row)

    return "Hi"