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
from validate_email import validate_email
import re

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
@app.route('/signup', methods=['POST'])
def signup():
    #Users FirstName TEXT, LastName TEXT, HomeAddress TEXT, Email TEXT, username TEXT, password TEXT)")
    if not request.json["password"]:
        return jsonify({"status": 400, "error": "invalid password"})
    pass_hash = bcrypt.generate_password_hash(request.json["password"])
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Users WHERE username=?", [request.json["username"]])
        row = cur.fetchone()
        if row:
            return jsonify({"status": 400, "error": "username exists"})
        if not request.json["firstName"]:
            return jsonify({"status": 400, "error": "invalid first name"})
        if not request.json["lastName"]:
            return jsonify({"status": 400, "error": "invalid last name"})
        if not request.json["username"]:
            return jsonify({"status": 400, "error": "invalid username"})
        email = request.json["email"]
        if not validate_email(email):
            return jsonify({"status": 400, "error": "invalid email"})
        address = request.json["homeAddress"]
        if not re.search(r"\d{1,5}\s\w.?\s(\b\w*\b\s){1,2}\w*\.?",address):
            return jsonify({"status": 400, "error": "invalid address"})

        cur.execute("INSERT INTO Users(FirstName,LastName,HomeAddress,Email,username,password) VALUES(?, ?,?,?,?,?)", [request.json["firstName"],request.json["lastName"],request.json["homeAddress"],request.json["email"],request.json["username"],pass_hash])
    return jsonify({"status":200, "token": jwt.encode({'username': request.json["username"]}, 'secret', algorithm='HS256')})

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

@app.route("/books/comment", methods=['POST'])
def comment_book():
    user_token = request.json["token"]
    username = jwt.decode(user_token, 'secret', algorithms=['HS256'])["username"]
    book_id = request.json["book_id"]
    comment = request.json["comment"]

    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Users WHERE username=?", [username])
        row = cur.fetchone()
        user_id=row["UserID"]
        first_name=row["FirstName"]
        last_name=row["LastName"]
        cur.execute("INSERT INTO Comments(BookId, UserID, Comment) VALUES (?,?,?)", [book_id, user_id,comment])

        return jsonify({"status":200})
@app.route("/books/<book_id>/comments")
def get_comments(book_id):
    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Comments WHERE BookId=?", [book_id])
        rows = cur.fetchall()
        to_return = []
        for row in rows:
            to_return.append({
                "userID": row["UserID"],
                "bookID": row["BookId"],
                "comment": row["Comment"]
            })
        for comment in to_return:
            cur.execute("SELECT * FROM Users WHERE UserID=?", [comment["userID"]])
            row = cur.fetchone()
            first_name=row["FirstName"]
            last_name=row["LastName"]
            comment["firstName"] = first_name
            comment["lastName"] = last_name
        return jsonify({"status":200,"comments": to_return})


@app.route("/books/rate/mine", methods=['POST'])
def get_rating():
    user_token = request.json["token"]
    username = jwt.decode(user_token, 'secret', algorithms=['HS256'])["username"]
    book_id = request.json["book_id"]

    with con:
        con.row_factory = lite.Row

        cur = con.cursor()
        cur.execute("SELECT * FROM Users WHERE username=?", [username])
        row = cur.fetchone()
        user_id=row["UserID"]
        cur.execute("SELECT * FROM Ratings WHERE BookId=? AND UserID=?", [book_id,user_id])
        row=cur.fetchone()
        if row:
            return jsonify({"status":200,"rating":row["rating"]})
        else:
            return jsonify({"status":200,"rating":0})


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
@app.route('/profile/edit', methods=['POST'])
def edit_profile():
    with con:
        con.row_factory = lite.Row
        cur = con.cursor()
        user_token = request.json["token"]
        username = jwt.decode(user_token, 'secret', algorithms=['HS256'])["username"]

        cur.execute("SELECT UserID FROM Users WHERE username=?", [username])
        row = cur.fetchone()
        user_id = row["UserID"]
        new_username=username
        if request.json["username"]:
            new_username=request.json["username"]
            cur.execute("UPDATE Users SET username = ? WHERE UserID=?",[request.json["username"],user_id])
        if request.json["firstName"]:
            cur.execute("UPDATE Users SET FirstName = ? WHERE UserID=?",[request.json["firstName"],user_id])
        if request.json["lastName"]:
            cur.execute("UPDATE Users SET LastName = ? WHERE UserID=?",[request.json["lastName"],user_id])
        if request.json["email"]:
            cur.execute("UPDATE Users SET Email = ? WHERE UserID=?",[request.json["email"],user_id])
        if request.json["homeAddress"]:
            cur.execute("UPDATE Users SET HomeAddress = ? WHERE UserID=?",[request.json["homeAddress"],user_id])
    return jsonify({"status":200, "token": jwt.encode({'username': new_username}, 'secret', algorithm='HS256')})


@app.route('/profile/insert/card', methods=['POST'])
def insert_card():
    with con:
        con.row_factory = lite.Row
        cur = con.cursor()

        cur.execute("SELECT UserID FROM Users WHERE username=?", [request.json["username"]])
        row = cur.fetchone()
        userid = row["UserID"]

        if not request.json["cardCompany"]:
            return jsonify({"status": 400, "error": "invalid credit card company"})
        if not request.json["cardNumber"]:
            return jsonify({"status": 400, "error": "invalid credit card number"})
        if not request.json["expirationDate"]:
            return jsonify({"status": 400, "error": "invalid expiration date"})
        if not request.json["secruityCode"]:
            return jsonify({"status": 400, "error": "invalid secruity code"})

        cur.execute("INSERT INTO PaymentInformation(UserID,CreditCardNumber,CreditCardCompany,ExpirationDate,SecruityCode) VALUES(?,?,?,?,?)", [userid,request.json["cardNumber"],request.json["cardCompany"],request.json["expirationDate"],request.json["secruityCode"]])
    return jsonify({"status":200, "token": jwt.encode({'username': request.json["username"]}, 'secret', algorithm='HS256')})


@app.route('/profile/delete/card', methods=['POST'])
def delete_card():
    with con:
        con.row_factory = lite.Row
        cur = con.cursor()

        cur.execute("SELECT UserID FROM Users WHERE username=?", [request.json["username"]])
        row = cur.fetchone()
        userid = row["UserID"]

        cur.execute("DELETE FROM PaymentInformation WHERE UserID=? and CreditCardNumber=? and CreditCardCompany=? and ExpirationDate=?", [userid,request.json["cardNumber"],request.json["cardCompany"],request.json["expirationDate"]])
    return jsonify({"status":200, "token": jwt.encode({'username': request.json["username"]}, 'secret', algorithm='HS256')})


@app.route('/profile/insert/shippingaddress', methods=['POST'])
def insert_shipping_address():
    with con:
        con.row_factory = lite.Row
        cur = con.cursor()

        cur.execute("SELECT UserID FROM Users WHERE username=?", [request.json["username"]])
        row = cur.fetchone()
        userid = row["UserID"]

        if not request.json["street"]:
            return jsonify({"status": 400, "error": "invalid street"})
        if not request.json["city"]:
            return jsonify({"status": 400, "error": "invalid city"})
        if not request.json["state"]:
            return jsonify({"status": 400, "error": "invalid state"})
        if not request.json["zipcode"]:
            return jsonify({"status": 400, "error": "invalid zipcode"})

        cur.execute("INSERT INTO ShippingAddresses(UserID,street,city,state,zipcode) VALUES(?,?,?,?,?)", [userid,request.json["street"],request.json["city"],request.json["state"],request.json["zipcode"]])
    return jsonify({"status":200, "token": jwt.encode({'username': request.json["username"]}, 'secret', algorithm='HS256')})


@app.route('/profile/delete/shippingaddress', methods=['POST'])
def delete_shipping_address():
    with con:
        con.row_factory = lite.Row
        cur = con.cursor()

        cur.execute("SELECT UserID FROM Users WHERE username=?", [request.json["username"]])
        row = cur.fetchone()
        userid = row["UserID"]

        cur.execute("DELETE FROM ShippingAddresses WHERE UserID=? and street=? and city=? and state=? and zipcode=?", [userid,request.json["street"],request.json["city"],request.json["state"],request.json["zipcode"]])
    return jsonify({"status":200, "token": jwt.encode({'username': request.json["username"]}, 'secret', algorithm='HS256')})

@app.route("/shopcart/savecart", methods=['POST'])
def save_cart():
    with con:
        con.row_factory = lite.Row
        cur = con.cursor()

        cur.execute("INSERT INTO ShoppingCart(UserID,BookID,Quantity) VALUES(?,?,?)", [request.json["userid"],request.json["bookID"],request.json["quantity"]])
    return jsonify({"status":200})
