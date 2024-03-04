This web application's purpose is to allow users to look at and manipulate a database that is filled with movies. 
Some key features of this web application is to first and foremost view, edit, delete, and add new movies to the 
database and view the changes live on the webpage. There are also web services that allow the user to sort the movies. 
There are two implemented ways of doing this - one is by sorting from highest to lowest ranking, and the second is to search 
by genre. The technologies used to provide this experience are Node.js, React, Express, Axios, and mySql. To activate the database, 
ensure that MySQL DataBase and Apache Web Server are running as seen on the XAMPP application Manager. Then open phpmyadmin and create a test 
user within the Movies database that has full privlages that we will use to connect with our app. To run the back end, 
open a terminal and type "cd backend". Then once the correct folder is accessed, type "npm start". This should connect the 
back end with the database. For the frontend, type "cd frontend" in the terminal. Then type "npm install" to install the node modules. 
Then finally type "npm start" and the frontend should start up and launch the react web page. The data sources that I have used to populate the database
are Wikipedia for movie info and IMDB for ratings.