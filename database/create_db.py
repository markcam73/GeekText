import sqlite3 as lite
import sys
import os

con = lite.connect(os.path.realpath(__file__)[0:os.path.realpath(__file__).find('create_db.py')] + 'geektext.db')

with con:

    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS Books")
    cur.execute("DROP TABLE IF EXISTS ShoppingCart")
    cur.execute("CREATE TABLE Books(Id INT, Title TEXT, Author TEXT, ImageSrc TEXT, Genre TEXT, Rating INT, Price INT, ReleaseDate TEXT, CopiesSold INT)")
    cur.execute("INSERT INTO Books VALUES(1, 'Battlefield Earth', 'L. Ron Hubbard', 'https://images-na.ssl-images-amazon.com/images/I/814C%2BsV1vJL.jpg', 'Sci-Fi & Fantasy', 5, 7.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(2, 'A Game of Thrones: A Song of Ice and Fire (Books 1-4)', 'George R. R. Martin', 'http://achalaupendran.com/wp-content/uploads/2016/06/song-of-ice-and-fire-book-cover.jpg', 'Sci-Fi & Fantasy', 5, 10.08, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(3, 'Ready Player One', 'Ernest Cline', 'http://agentpalmer.com/wp-content/uploads/2015/10/Ready-Player-One-Advance-Readers-Edition.png', 'Sci-Fi & Fantasy', 5, 9.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(4, 'The Martian', 'Andy Weir', 'http://insight.randomhouse.com/fullpage.do?pContentType=JPG&pName=fullpage&pISBN=9781101905005&pPageID=1', 'Sci-Fi & Fantasy', 5, 15, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(5, 'The Hobbit', 'J. R. R. Tolkien', 'https://cdn.pastemagazine.com/www/system/images/photo_albums/hobbit-book-covers/large/photo_5653_0-7.jpg?1384968217', 'Sci-Fi & Fantasy', 5, 14.99, 'Date', 10)")
    cur.execute("""INSERT INTO Books VALUES(6, "Ender's Game", 'Orson Scott Card', 'https://westonlibraryteenbookreviews.files.wordpress.com/2015/04/ender-movie.jpg', 'Sci-Fi & Fantasy', 5, 4.7, 'Date', 10)""")
    cur.execute("INSERT INTO Books VALUES(7, 'The Lord of the Rings: 50th Anniversary, One Vol. Edition', 'J. R. R. Tolkien', 'https://images-na.ssl-images-amazon.com/images/I/91rq1j7GYhL.jpg', 'Sci-Fi & Fantasy', 5, 12.43, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(8, '1984', 'George Orwell', 'https://s-media-cache-ak0.pinimg.com/originals/3f/fc/99/3ffc998b72aed768be34812da96d2607.jpg', 'Sci-Fi & Fantasy', 5, 9.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(9, 'Fahrenheit 451', 'Ray Bradbury', 'https://i.pinimg.com/736x/53/2e/30/532e3088dc4ab0893dbd81d0968968cc--moon-face-fahrenheit-.jpg', 'Sci-Fi & Fantasy', 5, 8.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(10, 'Knocked Up by the Dom: A BDSM Secret Baby Romance', 'Penelope Bloom', 'https://images-na.ssl-images-amazon.com/images/I/91Yxz9AKWBL.jpg', 'Romance', 5, 9.53, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(11, 'A Dark Lure', 'Loreth Anne White', 'https://images-na.ssl-images-amazon.com/images/I/51XoyAYObXL._SY346_.jpg', 'Romance', 5, 9.39, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(12, 'Once and for All', 'Sarah Dessen', 'http://www.adweek.com/galleycat/wp-content/uploads/sites/11/2016/10/Once-and-For-All-Cover-GalleyCat.jpg', 'Romance', 5, 14.48, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(13, 'The Fault in Our Stars', 'John Green', 'http://smithsonianapa.org/bookdragon/wp-content/uploads/sites/10/2012/11/Fault-in-Our-Stars.jpg', 'Romance', 5, 12.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(14, 'IT: A Novel', 'Stephen King', 'https://s-media-cache-ak0.pinimg.com/originals/11/c1/8f/11c18fbb50b3abe089e5f519cc1988cb.png', 'Mystery, Thriller & Suspense', 5, 24.48, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(15, 'The Cuban Affair', 'Nelson DeMille', 'https://images-na.ssl-images-amazon.com/images/I/81gFWg3HZXL.jpg', 'Mystery, Thriller & Suspense', 5, 28.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(16, 'The Late Show', 'Michael Connelly', 'https://www.michaelconnelly.com/wp-content/uploads/2017/01/TheLateShowUSA.jpg', 'Mystery, Thriller & Suspense', 5, 28, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(17, 'A Column of Fire', 'Ken Follett', 'https://www.geeksofdoom.com/GoD/img/2017/08/a-column-of-fire-book-cover-ken-follett.jpg', 'Mystery, Thriller & Suspense', 5, 15.99, 'Date', 10)")
    cur.execute("""INSERT INTO Books VALUES(18, "The Handmaid's Tale", 'Margaret Atwood', 'https://ewedit.files.wordpress.com/2017/03/9780525435006.jpg?w=1800&h=2776', 'Literature & Fiction', 5, 9.57, 'Date', 10)""")
    cur.execute("INSERT INTO Books VALUES(19, 'The Third Wife', 'Lisa Jewell', 'http://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781476792194/the-third-wife-9781476792194_hr.jpg', 'Literature & Fiction', 5, 12.8, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(20, 'The Hate U Give', 'Angie Thomas', 'https://m.media-amazon.com/images/S/aplus-media/vc/f043712f-4655-4c8a-b60f-fca1e4c6ca9f.JPG', 'Literature & Fiction', 5, 17.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(21, 'Everything, Everything', 'Nicola Yoon', 'http://2.bp.blogspot.com/-nKfBook8_9g/VJMM4HkUySI/AAAAAAAAC2A/_oSkXCo0EN8/s1600/EverythingEverythingCover.jpg', 'Literature & Fiction', 5, 12.18, 'Date', 10)")
    cur.execute("""INSERT INTO Books VALUES(22, 'The Nest', "Cynthia D'Aprix Sweeny", 'http://wtop.com/wp-content/uploads/2016/03/Books-The-Nest-Sweeney-809x1254.jpeg', 'Literature & Fiction', 5, 16.99, 'Date', 10)""")
    cur.execute("INSERT INTO Books VALUES(23, 'The Illustrated Man', 'Ray Bradbury', 'http://highwaytomars.com/wp-content/uploads/2013/08/illustrated_man.jpg', 'Literature & Fiction', 5, 6.77, 'Date', 10)")
    cur.execute("""INSERT INTO Books VALUES(24, "Let's Pretend This Never Happened: A Mostly True Memoir", 'Jenny Lawson', 'https://static1.squarespace.com/static/50a838b5e4b0d63ce68736ac/t/50e20207e4b0a05702b216de/1356988936805/Let%27s+Pretend+cover.jpg?format=750w', 'Humor & Satire', 5, 16, 'Date', 10)""")
    cur.execute("INSERT INTO Books VALUES(25, 'Infected', 'Scott Sigler', 'https://scottsigler.com/wp-content/uploads/2011/12/INF-PB-680.jpg', 'Mystery, Thriller & Suspense', 5, 16.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(26, 'Fifty Shades of Grey - Chinese Edition', 'E. L. James', 'https://images-na.ssl-images-amazon.com/images/I/81iT0JduCXL.jpg', 'Humor & Satire', 5, 25.42, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(27, 'Animal Farm', 'George Orwell', 'https://images-na.ssl-images-amazon.com/images/I/71RjpVEyscL.jpg', 'Humor & Satire', 5, 6.83, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(28, 'Twilight', 'Stephenie Meyer', 'https://vignette4.wikia.nocookie.net/uncyclopedia/images/b/ba/Twilight_book_cover.jpg/revision/latest?cb=20120104060816', 'Romance', 5, 15.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(29, 'The No Cussing Club', 'McKay Hatch', 'https://images-na.ssl-images-amazon.com/images/I/71du4Tz995L.jpg', 'Romance', 5, 99.99, 'Date', 10)")
    cur.execute("INSERT INTO Books VALUES(30, 'The Subtle Art of Not Giving A F*ck', 'Mark Manson', 'https://www.booktopia.com.au/http_coversbooktopiacomau/big/9781925483857/the-subtle-art-of-not-giving-a-f-ck.jpg', 'Self-Help & How-To', 5, 1, 'Date', 10)")
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
