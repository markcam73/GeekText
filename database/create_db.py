import sqlite3 as lite
import sys

con = lite.connect(os.path.realpath(__file__)[0:os.path.realpath(__file__).find('create_db.py')] + 'geektext.db')

with con:

    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS Books")
    cur.execute("CREATE TABLE Books(Id INT, Title TEXT, Author TEXT, ImageSrc TEXT, Genre TEXT, Rating INT, Price INT, ReleaseDate TEXT, CopiesSold INT)")
    cur.execute("INSERT INTO Books VALUES(1,'Mark Fajets book', 'Mark Fajet', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Biography',10,5,'9/16/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(2,'Graces book', 'Grace', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Action',8,5,'9/15/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(3,'Mark Camerons book', 'Mark Cameron', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Drama',9,5,'9/14/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(4,'Mannys book', 'Manny', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Comedy',3,5,'9/13/2017', 0)")
    cur.execute("INSERT INTO Books VALUES(5,'Michael book', 'Michael', 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/20245452_10209642053625013_3811989541249208996_n.jpg?oh=88f001bcd0d2ca72b494e073a4d13e23&oe=5A413B57','Comic',7,5,'9/12/2017', 0)")
