from flask import Flask
from flask import jsonify
from flask import request
app = Flask(__name__)
from flask_cors import CORS
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)
CORS(app)
import sqlite3 as lite
import os
import jwt

con = lite.connect(os.path.realpath(__file__)[0:os.path.realpath(__file__).find('routes.py')] + 'geektext.db')

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/login', methods=['POST'])
def login():
    user_info = request.json
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Users WHERE username=?", [user_info["username"]])
        row = cur.fetchone()
        if row and bcrypt.check_password_hash(row["password"], user_info["password"]):
            return jsonify({"status": 200, "token": jwt.encode({'username': user_info["username"]}, 'secret', algorithm='HS256')})
        else:
            return jsonify({"status": 401})

@app.route('/profile/mine', methods=['POST'])
def my_info():
    user_token = request.json["token"]
    username = jwt.decode(user_token, 'secret', algorithms=['HS256'])["username"]
    print username
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Users WHERE username=?", [username])
        row = cur.fetchone()

        to_return ={
            "status": 200,
            "userID": row["UserID"],
            "firstName": row["FirstName"],
            "lastName": row["LastName"],
            "username": row["username"],
            "email": row["Email"],
            "homeAddress": row["HomeAddress"]
        }
        return jsonify(to_return)

@app.route("/books")
def books():
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Books")

        rows = cur.fetchall()
        to_return = []
        for row in rows:
            to_return.append({
                "id": row["Id"],
                "title": row["Title"],
                "imageSrc": row["ImageSrc"],
                "author": row["Author"],
                "genre": row["Genre"],
                "rating": row["Rating"],
                "price": row["Price"],
                "releaseDate": row["ReleaseDate"],
                "description": row["Description"]

            })
        return jsonify(to_return)
@app.route("/books/<book_ID>")
def get_book(book_ID):
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Books WHERE Id=" + book_ID)

        row = cur.fetchone()
        to_return = None
        to_return={
            "id": row["Id"],
            "title": row["Title"],
            "imageSrc": row["ImageSrc"],
            "author": row["Author"],
            "genre": row["Genre"],
            "rating": row["Rating"],
            "price": row["Price"],
            "releaseDate": row["ReleaseDate"],
            "description": row["Description"]

        }
        return jsonify(to_return)

@app.route("/profile/<username>")
def profile(username):
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Users WHERE username=?", [username])
        row = cur.fetchone()

        to_return ={
            "userID": row["UserID"],
            "firstName": row["FirstName"],
            "lastName": row["LastName"],
            "username": row["username"],
            "email": row["Email"],
            "homeAddress": row["HomeAddress"]
        }
        return jsonify(to_return)
