from flask import Flask
from flask import jsonify
app = Flask(__name__)
from flask_cors import CORS
CORS(app)
import sqlite3 as lite
import os

con = lite.connect(os.path.realpath(__file__)[0:os.path.realpath(__file__).find('routes.py')] + 'geektext.db')

@app.route("/")
def hello():
    return "Hello World!"

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
