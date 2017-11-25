# -*- coding: utf-8 -*-
import sqlite3 as lite
import sys
import os

con = lite.connect(os.path.realpath(__file__)[0:os.path.realpath(__file__).find('create_db.py')] + 'geektext.db')

with con:

    cur = con.cursor()
    cur.execute("DROP TABLE IF EXISTS Books")
    cur.execute("DROP TABLE IF EXISTS ShoppingCart")
    cur.execute("CREATE TABLE Books(Id INTEGER PRIMARY KEY, Title TEXT, Author TEXT, ImageSrc TEXT, Genre TEXT, Rating INT, Price DECIMAL(18,2), ReleaseDate TEXT, CopiesSold INT, Description TEXT, AuthorBio TEXT, PubInfo TEXT)")
    cur.execute("""INSERT INTO Books VALUES(1, 'Battlefield Earth', 'L. Ron Hubbard', 'https://images-na.ssl-images-amazon.com/images/I/814C%2BsV1vJL.jpg', 'Sci-Fi & Fantasy', 5, 7.99, 'January 2, 2015', 10, "In the year A.D. 3000, Earth is a barren wasteland, plundered of its natural resources by alien conquerors known as Psychlos. Fewer than thirty-five thousand humans survive in a handful of communities scattered across the face of a post-apocalyptic Earth.", 'Test', 'Publisher Info')""")
    cur.execute("""INSERT INTO Books VALUES(2, 'A Game of Thrones', 'George R. R. Martin', 'http://achalaupendran.com/wp-content/uploads/2016/06/song-of-ice-and-fire-book-cover.jpg', 'Sci-Fi & Fantasy', 5, 17.99, 'February 3, 2005', 10, "From a master of contemporary fantasy comes the first novel of a landmark series unlike any you've ever read before. With A Game of Thrones, George R. R. Martin has launched a genuine masterpiece, bringing together the best the genre has to offer. Mystery, intrigue, romance, and adventure fill the pages of this magnificent saga, the first volume in an epic series sure to delight fantasy fans everywhere", 'Test', 'Publisher Info')""")
    cur.execute("INSERT INTO Books VALUES(3, 'Ready Player One', 'Ernest Cline', 'http://agentpalmer.com/wp-content/uploads/2015/10/Ready-Player-One-Advance-Readers-Edition.png', 'Sci-Fi & Fantasy', 5, 9.99, 'April 20, 2010', 10, 'The bestselling cult classic-soon to be a major motion picture directed by Steven Spielberg. At once wildly original and stuffed with irresistible nostalgia, READY PLAYER ONE is a spectacularly genre-busting, ambitious, and charming debut-art quest novel, part love story, and part virtual space opera set in a universe where spell-slinging mages battle giant Japanese robots, entire planets are inspired by Blade Runner, and flying DeLoreans achieve light speed. ', 'Test', 'Publisher Info')")
    cur.execute("""INSERT INTO Books VALUES(4, 'The Martian', 'Andy Weir', 'http://insight.randomhouse.com/fullpage.do?pContentType=JPG&pName=fullpage&pISBN=9781101905005&pPageID=1', 'Sci-Fi & Fantasy', 5, 15.99, 'March 16, 2000', 10, "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars. Now, he's sure he'll be the first person to die there.", 'Test', 'Publisher Info')""")
    cur.execute("INSERT INTO Books VALUES(5, 'The Hobbit', 'J. R. R. Tolkien', 'https://cdn.pastemagazine.com/www/system/images/photo_albums/hobbit-book-covers/large/photo_5653_0-7.jpg?1384968217', 'Sci-Fi & Fantasy', 5, 14.99, 'November 8, 1989', 10, 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. ', 'Test', 'Publisher Info')")
    cur.execute("""INSERT INTO Books VALUES(6, "Ender's Game", 'Orson Scott Card', 'https://westonlibraryteenbookreviews.files.wordpress.com/2015/04/ender-movie.jpg', 'Sci-Fi & Fantasy', 5, 4.99, 'February 17, 2008', 10, 'In order to develop a secure defense against a hostile alien races next attack, government agencies breed child geniuses and train them as soldiers. A brilliant young boy, Andrew Ender Wiggin lives with his kind but distant parents, his sadistic brother Peter, and the person he loves more than anyone else, his sister Valentine. ', 'Test', 'Publisher Info')""")
    cur.execute("INSERT INTO Books VALUES(7, 'The Lord of the Rings: 50th Anniversary, One Vol. Edition', 'J. R. R. Tolkien', 'https://images-na.ssl-images-amazon.com/images/I/91rq1j7GYhL.jpg', 'Sci-Fi & Fantasy', 5, 12.99, 'October 1, 1980', 10, 'One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(8, '1984', 'George Orwell', 'https://s-media-cache-ak0.pinimg.com/originals/3f/fc/99/3ffc998b72aed768be34812da96d2607.jpg', 'Sci-Fi & Fantasy', 5, 9.99, 'April 20, 1948', 10, 'Written in 1948, 1984 was George Orwells chilling prophecy about the future. And while 1984 has come and gone, his dystopian vision of a government that will do anything to control the narrative is timelier than ever...', 'Test', 'Test')")
    cur.execute("INSERT INTO Books VALUES(9, 'Fahrenheit 451', 'Ray Bradbury', 'https://i.pinimg.com/736x/53/2e/30/532e3088dc4ab0893dbd81d0968968cc--moon-face-fahrenheit-.jpg', 'Sci-Fi & Fantasy', 5, 8.99, 'December 4, 1940', 10, 'Guy Montag is a fireman. In his world, where television rules and literature is on the brink of extinction, firemen start fires rather than put them out. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(10, 'Knocked Up by the Dom: A BDSM Secret Baby Romance', 'Penelope Bloom', 'https://images-na.ssl-images-amazon.com/images/I/91Yxz9AKWBL.jpg', 'Romance', 5, 9.99, 'February 2, 2016', 10, 'My darkest secret? I let a stranger dominate me in the most intimate way possible. He gave me three things that night: His first name, the sweet taste of submission, and his baby.', 'Test', 'Publisher Info')")
    cur.execute("""INSERT INTO Books VALUES(11, "Harry Potter and the Sorcerer's Stone", 'J.K. Rowling', 'http://s3.thingpic.com/images/UW/3ZiTHB6N1VYToynxJvG1N5uX.jpeg', 'Sci-Fi & Fantasy', 5, 9.99, 'June 27, 1996', 10, "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. An incredible adventure is about to begin!", 'Test' ,'Publisher Info')""") 
    cur.execute("INSERT INTO Books VALUES(12, 'Once and for All', 'Sarah Dessen', 'http://www.adweek.com/galleycat/wp-content/uploads/sites/11/2016/10/Once-and-For-All-Cover-GalleyCat.jpg', 'Romance', 5, 14.99, 'July 20, 2009', 10, 'From Sarah Dessen, the beloved New York Times bestselling author of SAINT ANYTHING and JUST LISTEN, comes a new novel set in the world of wedding planning!', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(13, 'The Fault in Our Stars', 'John Green', 'http://smithsonianapa.org/bookdragon/wp-content/uploads/sites/10/2012/11/Fault-in-Our-Stars.jpg', 'Romance', 5, 12.99, 'August 9, 2013', 10, 'Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel’s story is about to be completely rewritten.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(14, 'IT: A Novel', 'Stephen King', 'https://s-media-cache-ak0.pinimg.com/originals/11/c1/8f/11c18fbb50b3abe089e5f519cc1988cb.png', 'Mystery, Thriller & Suspense', 5, 24.48, 'May 5, 2007', 10, 'Welcome to Derry, Maine. It’s a small city, a place as hauntingly familiar as your own hometown. Only in Derry the haunting is real.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(15, 'The Cuban Affair', 'Nelson DeMille', 'https://images-na.ssl-images-amazon.com/images/I/81gFWg3HZXL.jpg', 'Mystery, Thriller & Suspense', 5, 28.99, 'July 19, 2008', 10, 'Renee Ballard works the night shift in Hollywood also known as the Late Show beginning many investigations but finishing none, as each morning she turns everything over to the day shift. A once up-and-coming detective, she has been given this beat as punishment after filing a sexual harassment complaint against a supervisor.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(16, 'The Late Show', 'Michael Connelly', 'https://www.michaelconnelly.com/wp-content/uploads/2017/01/TheLateShowUSA.jpg', 'Mystery, Thriller & Suspense', 5, 28.99, 'March 2, 2010', 10, 'seems to have a pretty good life. At age thirty-five he’s living in Key West, owner of a forty-two-foot charter fishing boat, The Maine. Mac served five years in the Army as an infantry officer with two tours in Afghanistan. He returned with the Silver Star, two Purple Hearts, scars that don’t tan, and a boat with a big bank loan. Truth be told, Mac’s finances are more than a little shaky.', 'Test', 'Publisher Info')")
    cur.execute("""INSERT INTO Books VALUES(17, "The Sun and Her Flowers", 'Rupi Kaur', 'https://s3.amazonaws.com/wapopartners.com/dbknews-wp/wp-content/uploads/2017/10/08202304/sun-and-flowers.jpg', 'Mystery, Thriller & Suspense', 5, 15.99, 'October 3, 2017', 10, 'From Rupi Kaur, the New York Times bestselling author of milk and honey, comes her long-awaited second collection of poetry.  A vibrant and transcendent journey about growth and healing. Ancestry and honoring one’s roots. Expatriation and rising up to find a home within yourself.', 'Test', 'Publisher Info')""")
    cur.execute("""INSERT INTO Books VALUES(18, "The Handmaid's Tale", 'Margaret Atwood', 'https://ewedit.files.wordpress.com/2017/03/9780525435006.jpg?w=1800&h=2776', 'Literature & Fiction', 5, 9.99, 'September 10, 2013', 10, 'A National Book Award Longlist title with eight starred reviews! #1 New York Times Bestseller!', 'Test', 'Publisher Info')""")
    cur.execute("INSERT INTO Books VALUES(19, 'The Third Wife', 'Lisa Jewell', 'http://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781476792194/the-third-wife-9781476792194_hr.jpg', 'Literature & Fiction', 5, 12.99, 'April 24, 2011', 10, 'Fans of Liane Moriarty and Jojo Moyes will be captivated by this riveting family drama with a dark mystery at its core, from the New York Times bestselling author of The House We Grew Up In.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(20, 'The Hate U Give', 'Angie Thomas', 'https://m.media-amazon.com/images/S/aplus-media/vc/f043712f-4655-4c8a-b60f-fca1e4c6ca9f.JPG', 'Literature & Fiction', 5, 17.99, 'March 23, 2003', 10, 'Sixteen-year-old Starr Carter moves between two worlds: the poor neighborhood where she lives and the fancy suburban prep school she attends. The uneasy balance between these worlds is shattered when Starr witnesses the fatal shooting of her childhood best friend Khalil at the hands of a police officer. Khalil was unarmed. Soon afterward, his death is a national headline. Some are calling him a thug, maybe even a drug dealer and a gangbanger. Protesters are taking to the streets in Khalil’s name. Some cops and the local drug lord try to intimidate Starr and her family. What everyone wants to know is: what really went down that night? And the only person alive who can answer that is Starr. But what Starr does—or does not—say could upend her community. It could also endanger her life.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(21, 'Everything, Everything', 'Nicola Yoon', 'http://2.bp.blogspot.com/-nKfBook8_9g/VJMM4HkUySI/AAAAAAAAC2A/_oSkXCo0EN8/s1600/EverythingEverythingCover.jpg', 'Literature & Fiction', 5, 12.99, 'January 30, 2001', 10, 'What if you couldn’t touch anything in the outside world? Never breathe in the fresh air, feel the sun warm your face . . . or kiss the boy next door? In Everything, Everything, Maddy is a girl who’s literally allergic to the outside world, and Olly is the boy who moves in next door . . . and becomes the greatest risk she’s ever taken. ', 'Test', 'Publisher Info')")
    cur.execute("""INSERT INTO Books VALUES(22, 'The Nest', "Cynthia D'Aprix Sweeny", 'http://wtop.com/wp-content/uploads/2016/03/Books-The-Nest-Sweeney-809x1254.jpeg', 'Literature & Fiction', 5, 16.99, 'June 2, 1987', 10, 'A warm, funny and acutely perceptive debut novel about four adult siblings and the fate of the shared inheritance that has shaped their choices and their lives. Every family has its problems. But even among the most troubled, the Plumb family stands out as spectacularly dysfunctional. Years of simmering tensions finally reach a breaking point on an unseasonably cold afternoon in New York City as Melody, Beatrice, and Jack Plumb gather to confront their charismatic and reckless older brother, Leo, freshly released from rehab. Months earlier, an inebriated Leo got behind the wheel of a car with a nineteen-year-old waitress as his passenger. The ensuing accident has endangered the Plumbs joint trust fund, The Nest, which they are months away from finally receiving. Meant by their deceased father to be a modest mid-life supplement, the Plumb siblings have watched The Nest value soar along with the stock market and have been counting on the money to solve a number of self-inflicted problems. Melody, a wife and mother in an upscale suburb, has an unwieldy mortgage and looming college tuition for her twin teenage daughters. Jack, an antiques dealer, has secretly borrowed against the beach cottage he shares with his husband, Walker, to keep his store open. And Bea, a once-promising short-story writer, just cant seem to finish her overdue novel. Can Leo rescue his siblings and, by extension, the people they love? Or will everyone need to reimagine the futures they have envisioned? Brought together as never before, Leo, Melody, Jack, and Beatrice must grapple with old resentments, present-day truths, and the significant emotional and financial toll of the accident, as well as finally acknowledge the choices they have made in their own lives.', 'Test', 'Publisher Info')""")
    cur.execute("INSERT INTO Books VALUES(23, 'The Illustrated Man', 'Ray Bradbury', 'http://highwaytomars.com/wp-content/uploads/2013/08/illustrated_man.jpg', 'Literature & Fiction', 5, 6.99, 'January 12, 1993', 10, 'The Illustrated Man, a seminal work in Ray Bradbury’s career, whose extraordinary power and imagination remain undimmed by time’s passage, is available from Simon & Schuster for the first time.', 'Test', 'Publisher Info')")
    cur.execute("""INSERT INTO Books VALUES(24, "Let's Pretend This Never Happened: A Mostly True Memoir", 'Jenny Lawson', 'https://static1.squarespace.com/static/50a838b5e4b0d63ce68736ac/t/50e20207e4b0a05702b216de/1356988936805/Let%27s+Pretend+cover.jpg?format=750w', 'Humor & Satire', 5, 16.99, 'April 1, 2000', 10, 'When Jenny Lawson was little, all she ever wanted was to fit in. That dream was cut short by her fantastically unbalanced father and a morbidly eccentric childhood. It did, however, open up an opportunity for Lawson to find the humor in the strange shame-spiral that is her life, and we are all the better for it. In the irreverent Let’s Pretend This Never Happened, Lawson’s long-suffering husband and sweet daughter help her uncover the surprising discovery that the most terribly human moments—the ones we want to pretend never happened—are the very same moments that make us the people we are today. For every intellectual misfit who thought they were the only ones to think the things that Lawson dares to say out loud, this is a poignant and hysterical look at the dark, disturbing, yet wonderful moments of our lives. ', 'Test', 'Publisher Info')""")
    cur.execute("INSERT INTO Books VALUES(25, 'Infected', 'Scott Sigler', 'https://scottsigler.com/wp-content/uploads/2011/12/INF-PB-680.jpg', 'Mystery, Thriller & Suspense', 5, 16.99, 'May 16, 2009', 10, 'A mysterious disease is turning thousands of ordinary Americans into raving, paranoid murderers who inflict brutal horrors on strangers, their own families, and even themselves. And one morning, ex–football star Perry Dawsey awakens to find mysterious welts growing all over his body. Soon Perry finds himself acting and thinking strangely, hearing voices, fighting uncontrollable rage . . . he is infected. Worse, the disease wants something from him, something that could alter the fate of the human race.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(26, 'Fifty Shades of Grey', 'https://images-na.ssl-images-amazon.com/images/I/81iT0JduCXL.jpg', 'Humor & Satire', 5, 25.99, 'February 10, 2014', 10, 'When literature student Anastasia Steele goes to interview young entrepreneur Christian Grey, she encounters a man who is beautiful, brilliant, and intimidating. The unworldly, innocent Ana is startled to realize she wants this man and, despite his enigmatic reserve, finds she is desperate to get close to him. Unable to resist Ana’s quiet beauty, wit, and independent spirit, Grey admits he wants her, too—but on his own terms. Shocked yet thrilled by Grey’s singular erotic tastes, Ana hesitates. For all the trappings of success—his multinational businesses, his vast wealth, his loving family—Grey is a man tormented by demons and consumed by the need to control. When the couple embarks on a daring, passionately physical affair, Ana discovers Christian Grey’s secrets and explores her own dark desires.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(27, 'Animal Farm', 'George Orwell', 'https://images-na.ssl-images-amazon.com/images/I/71RjpVEyscL.jpg', 'Humor & Satire', 5, 6.99, 'June 2, 2011', 10, 'A George Orwell classic timeless and timely allegorical novel—a scathing satire on a downtrodden societys blind march towards totalitarianism. All animals are equal, but some animals are more equal than others.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(28, 'Twilight', 'Stephenie Meyer', 'https://vignette4.wikia.nocookie.net/uncyclopedia/images/b/ba/Twilight_book_cover.jpg/revision/latest?cb=20120104060816', 'Romance', 5, 15.99, 'August 10, 2006', 10, 'Isabella Swan moves to Forks, a small, perpetually rainy town Washington, could have been the most boring move she ever made. But once she meets the mysterious alluring Edward Cullen, Isabella and her life take a thrilling and terrifying turn. Up until now, Edward has managed to keep his vampire identity a secret in the small community he lives in, but now nobody is safe, especially Isabella, the person Edward holds most dear. The lovers find themselves balanced precariously on the point of a knife-between desire and danger. Deeply romantic and extraordinarily suspenseful, Twilight captures the struggle between defying our instincts and satisfying our desires. This is a love story with bite.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(29, 'The No Cussing Club', 'McKay Hatch', 'https://images-na.ssl-images-amazon.com/images/I/71du4Tz995L.jpg', 'Romance', 5, 9.99, 'October 20, 2003', 10, '14 year old McKay Hatch has been the target of bullying at school and intense cyberbullying as well. All because he took a stand to tell his friends, Dont Cuss. Here, in McKay s own story, see how the No Cussing Club he started at his high school caught the attention of the world and quickly grew to include more than 20,000 members in every state and more than 30 countries. Discover how McKay did it, how he persevered against severe peer pressure, how he is making a difference in thousands of people lives and how you can too! The No Cussing Club includes examples from the thousands of e-mails McKay has received. The tons of tips and tools included make the book enjoyable, interactive and a great handbook to help teens stand up to peer pressure, handle bullying and cyberbullying, and find ways to make a difference.', 'Test', 'Publisher Info')")
    cur.execute("INSERT INTO Books VALUES(30, 'The Subtle Art of Not Giving A F*ck', 'Mark Manson', 'https://www.booktopia.com.au/http_coversbooktopiacomau/big/9781925483857/the-subtle-art-of-not-giving-a-f-ck.jpg', 'Self-Help & How-To', 5, 9.99, 'December 2, 2016', 10, 'In this generation defining self-help guide a superstar blogger cuts through the crap to show us how to stop trying to be positive all the time so that we can truly become better, happier people.', 'Test', 'Publisher Info')")


    cur.execute("CREATE TABLE ShoppingCart (UserID INT, Title TEXT, ImageSrc TEXT, Price INT, BookID INT, Quantity INT)")
    cur.execute("""INSERT INTO ShoppingCart VALUES(1, 'Battlefield Earth', 'https://images-na.ssl-images-amazon.com/images/I/814C%2BsV1vJL.jpg', 7.99, 1, 2)""")
    cur.execute("""INSERT INTO ShoppingCart VALUES(2, 'A Game of Thrones', 'http://achalaupendran.com/wp-content/uploads/2016/06/song-of-ice-and-fire-book-cover.jpg', 17.99, 2, 2)""")
    cur.execute("DROP TABLE IF EXISTS Users")
    cur.execute("CREATE TABLE Users(UserID INTEGER PRIMARY KEY AUTOINCREMENT, FirstName TEXT, LastName TEXT, HomeAddress TEXT, Email TEXT, username TEXT, password TEXT)")
    cur.execute("INSERT INTO Users VALUES(1, 'John', 'Doe','111 W 1st Ave','dummy@dummy.com','user1','$2b$12$fBNePNjTsJBzV5mTV0Rok.5UA5.PKKWrnqnEDHY5zHwXJVR6X8z3a')")
    cur.execute("DROP TABLE IF EXISTS PaymentInformation")
    cur.execute("CREATE TABLE PaymentInformation(PaymentID INTEGER PRIMARY KEY AUTOINCREMENT, UserID INT, CreditCardNumber TEXT, CreditCardCompany TEXT, ExpirationDate TEXT, SecruityCode TEXT)")
    cur.execute("INSERT INTO PaymentInformation VALUES(1, 1,'2222334567','Python Credit Union','10/17/20','123')")
    cur.execute("DROP TABLE IF EXISTS ShippingAddresses")
    cur.execute("CREATE TABLE ShippingAddresses(addressid INTEGER PRIMARY KEY AUTOINCREMENT, userid INT, Street TEXT, City TEXT, State TEXT, Zipcode INT)")
    cur.execute("INSERT INTO ShippingAddresses VALUES(1,1,'111 W 1st Ave','Miami','Florida',33333)")
    cur.execute("INSERT INTO ShippingAddresses VALUES(2,1,'123 S 12st Ave','Miami','Florida',33133)")
    cur.execute("DROP TABLE IF EXISTS Comments")
    cur.execute("CREATE TABLE Comments(CommentID INTEGER PRIMARY KEY AUTOINCREMENT, BookId INT, UserID INT, Comment TEXT)")
    cur.execute("DROP TABLE IF EXISTS Ratings")
    cur.execute("CREATE TABLE Ratings(BookId INT, UserID INT, Rating INT, PRIMARY KEY(BookId,UserID))")
