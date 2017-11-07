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

@app.route("/books/top")
def top_books():
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Books ORDER BY CopiesSold DESC LIMIT 5")

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
@app.route("/books/author/<author>")
def get_books_by_author(author):
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Books WHERE Author=?", [author])

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
@app.route("/books/genre/<genre>")
def get_books_in_genre(genre):
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Books WHERE Genre=?", [genre])

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

@app.route("/books/rate", methods=['POST'])
def rate_book():
    user_token = request.json["token"]
    username = jwt.decode(user_token, 'secret', algorithms=['HS256'])["username"]
    book_id = request.json["book_id"]
    rating = request.json["rating"]

    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Users WHERE username=?", [username])
        row = cur.fetchone()
        user_id=row["UserID"]
        cur.execute("INSERT OR REPLACE INTO Ratings VALUES (?,?,?)", [book_id, user_id,rating])
        cur.execute("SELECT * FROM Ratings WHERE BookId=?", [book_id])
        rows=cur.fetchall()
        total=0
        count = 0
        for row in rows:
            count+=1
            total+=row["rating"]
        avg_rating=total/count
        sql =  "UPDATE Books SET Rating=? WHERE Id = ?"
        cur.execute(sql,(avg_rating,book_id))
        return jsonify({"status":200,"newRating":avg_rating})

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

@app.route("/profile", methods=['POST'])
def profile():
    with con:
        user_token = request.json["token"]
        username = jwt.decode(user_token, 'secret', algorithms=['HS256'])["username"]

        addresses = []
        cards = []

        con.row_factory = lite.Row

        cur = con.cursor()

        cur.execute("SELECT sp.* FROM ShippingAddresses as sp INNER JOIN Users as u ON u.userid = sp.userid where u.username=?", [username])
        row = cur.fetchall()
        for rows in row:
            addresses.append({
                "street": rows["Street"],
                "city": rows["City"],
                "state": rows["State"],
                "zip": rows["Zipcode"]
            })

        cur.execute("SELECT pa.* FROM PaymentInformation as pa INNER JOIN Users as u ON u.userid = pa.userid where u.username=?", [username])
        row = cur.fetchall()
        for rows in row:
            cards.append({
                "cardNumber": rows["CreditCardNumber"],
                "cardCompany": rows["CreditCardCompany"],
                "expirationDate": rows["expirationDate"]
            })

        cur.execute("SELECT * FROM Users WHERE username=?", [username])
        row = cur.fetchone()
        if row:
            to_return ={
                "userID": row["UserID"],
                "firstName": row["FirstName"],
                "lastName": row["LastName"],
                "username": row["username"],
                "email": row["Email"],
                "homeAddress": row["HomeAddress"],
                "shippingAddresses": addresses,
                "creditCards": cards,
                "status": 200
        }




        return jsonify(to_return)
