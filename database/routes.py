from flask import Flask
from flask import jsonify
app = Flask(__name__)
from flask_cors import CORS
CORS(app)
import sqlite3 as lite

con = lite.connect('geektext.db')

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
                "releaseDate": row["ReleaseDate"]
            })
        return jsonify(to_return)
