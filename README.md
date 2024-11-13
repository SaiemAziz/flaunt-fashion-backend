
# Flaunt Fashion Backend
## Overview
This is an Express.js Backend project for Flaunt Fashion website. Flaunt Fashion is a dynamic platform that empowers fashion enthusiasts to showcase their creativity and compete in exciting fashion contests. It provides a user-friendly interface for participants to submit their designs, and a voting system for users to cast their votes.
#### Server: https://flaunt-fashion-backend.onrender.com/api/v1 

## Entity Relationship Diagram
![ERD](https://i.ibb.co.com/WvvKqNQ/fashion.jpg)


## Technologies
* **express.js** for server.
* **mysql2** for MySQL driver and DB management.
* **sequelize** for ORM system.
* **jwt** for access token management.
* **dotenv** for environment management.
* **cookie-parser** to handle tokens.
* **bcrypt** to hash password and save in DB.
* **nodemailer** to send reset password email.
## Features
#### Admin
* Can ban/unban any contestant.
* Can perform CRUD on Contests. 
* Can perform CRUD on Blogs. 
* Can approve/disapprove Blogs. 
#### Contestant
* Can sign up.
* Can sign in using email and password.
* Doesn't need to sign in again after closing session. 
* At every 7 days the sign in validation expires. Need to sign in again. 
* Can reset password if its forgotten.
* Banned email user can't login.
* Can participate in Contests before deadline. 
* Can perform CRUD on Posts within contest. 
* Can't update post if its approved already. 
* Can vote/unvote others posts. 
* Can update profile information.
#### Public
* Can read Blogs.
* Can see Contests and belonging Posts.




## Code Managements
* Tried to follow professional folder Managements.
* Routes, Controller functions and Schema files are seperated according to Tables.
* Routes API paths were created following standard convention.
* Schemas are created according to Table architecture following above ERD.
* Common/Reusable functions are seperated in common files for better usage.
* Tried to utilize most of the common HTTP status codes convention.
* Error Managements was done carefully and tried to give proper error messages in response.
* Comments added in multiple places for better understanding.
* Variables and Functions names were choosen carefully for better understanding the purpose of their usage.
* Semantic naming convention were followed across the project. 
* Will add some more API in future according to business logic demands.