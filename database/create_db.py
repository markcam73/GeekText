import sqlite3 as lite
import sys
import os

con = lite.connect(os.path.realpath(__file__)[0:os.path.realpath(__file__).find('create_db.py')] + 'geektext.db')

with con:

    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS Books")
    cur.execute("DROP TABLE IF EXISTS ShoppingCart")
    cur.execute("CREATE TABLE Books(Id INT, Title TEXT, Author TEXT, ImageSrc TEXT, Genre TEXT, Rating INT, Price INT, ReleaseDate TEXT, CopiesSold INT)")
    cur.execute("INSERT INTO Books VALUES(1,'The Hobbit', 'J. R. R. Tolkien', 'https://cdn.pastemagazine.com/www/system/images/photo_albums/hobbit-book-covers/large/photo_5653_0-7.jpg?1384968217','Sci-Fi & Fantasy',5,5,'9/16/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(2,'Graces book', 'Grace', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Action',4,5,'9/15/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(3,'Mark Camerons book', 'Mark Cameron', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Drama',3,5,'9/14/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(4,'Mannys book', 'Manny', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Comedy',2,5,'9/13/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(5,'Michael book', 'Michael', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Comic',1,5,'9/12/2017', 0)")
    cur.execute("CREATE TABLE ShoppingCart (UserId INT, BookID INT, Quantity INT)")
    cur.execute("INSERT INTO ShoppingCart VALUES(1234, 2, 1)")
    cur.execute("INSERT INTO ShoppingCart VALUES(123, 1, 3)")
    cur.execute("INSERT INTO ShoppingCart VALUES(12, 4, 6)")
    cur.execute("INSERT INTO ShoppingCart VALUES(1, 1, 2)")
    cur.execute("INSERT INTO ShoppingCart VALUES(124, 2, 1)")
    cur.execute("DROP TABLE IF EXISTS Users")
    cur.execute("CREATE TABLE Users(UserID INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName TEXT, HomeAddress TEXT, Email TEXT, username TEXT, password TEXT)")
    cur.execute("DROP TABLE IF EXISTS PaymentInformation")
    cur.execute("CREATE TABLE PaymentInformation(PaymentID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INT, CreditCardNumber TEXT, CreditCardCompany TEXT, ExpirationDate TEXT, SecruityCode TEXT)")
    cur.execute("DROP TABLE IF EXISTS ShippingAddresses")
    cur.execute("CREATE TABLE ShippingAddresses(addressid INTEGER PRIMARY KEY AUTOINCREMENT, userid INT, Street TEXT, City TEXT, State TEXT, Zipcode INT)")
