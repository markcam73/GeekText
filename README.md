# GeekText
Project for CEN 4010

dependencies
* Python2
* Flask
* flask_cors
* react
* PyJWT
* flask-bcrypt

installation instructions
After cloning the repository:
```
npm install
pip install flask
pip install flask_cors
pip install PyJWT
pip install flask-bcrypt
```
First run the backend server (Unix/Linux/Mac):
```
FLASK_APP=./database/routes.py flask run
```
Run the backend server (Windows):
```
set FLASK_APP=./database/routes.py
flask run
```
then in another terminal run ```npm start``` in the command prompt to see the front end
