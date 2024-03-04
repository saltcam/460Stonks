
const express = require("express")
const cors = require("cors")
// retrieve the MySQL DB Configuration Module
const dbConnection = require("./config")
// use this library for parsing HTTP body requests
var bodyParser = require('body-parser');


var app = express(express.json); 

app.use(cors());
app.use(bodyParser.json());

// ----------------------------------------------
// Ref: https://expressjs.com/en/4x/api.html#app


// (1) Retrieve all records in Movies table
// root URI: http://localhost:2000/
app.get('/', (request, response) => {
    const sqlQuery = "SELECT * FROM Movies;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
    return response.status(200).json(result);
    });
});


// (2) Retrieve all records in Movies table sorted from highest ranking to lowest
// root URI: http://localhost:2000/
app.get('/movies/sorted-by-rating', (request, response) => {
    const sqlQuery = "SELECT * FROM Movies ORDER BY Rating DESC;";
    dbConnection.query(sqlQuery, (err, result) => {
        if (err) {
            return response.status(400).json({Error: "Error in the SQL statement. Please check."});
        }
        response.setHeader('SQLQuery', sqlQuery); // Optionally, send a custom header attribute
        return response.status(200).json(result);
    });
});


// (3) Search Movies by Genre
// root URI: http://localhost:2000/
app.get('/movies/search', (request, response) => {
    const genre = request.query.genre; // Get the genre from query parameters
    if (!genre) {
        return response.status(400).json({Error: "No genre specified"});
    }

    const sqlQuery = "SELECT * FROM Movies WHERE Genre = ?;";
    dbConnection.query(sqlQuery, [genre], (err, result) => {
        if (err) {
            return response.status(500).json({Error: "Error executing SQL query"});
        }
        if (result.length === 0) {
            return response.status(404).json({Message: "No movies found for this genre"});
        }
        return response.status(200).json(result);
    });
});



// (4) Retrieve info of a specific movie 
// name URI: http://localhost:2000/Name
app.get('/:Name', (request, response) => {
    const movie = request.params.Name;
    const sqlQuery = "SELECT * FROM Movies WHERE Name = '" + movie +"';";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('MovieName', movie); // send a custom
    return response.status(200).json(result);
    });
});

// (5) insert a new record by movie name
// name URI: http://localhost:2000/Name
app.post('/:Name', (request, response) => {
    const sqlQuery = 'INSERT INTO MOVIES VALUES (?);';
    const values = [request.body.Name, request.body.ReleaseDate, request.body.Rating,
     request.body.Director, request.body.Genre];
    dbConnection.query(sqlQuery, [values], (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Failed: Record was not added."});
    }
    return response.status(200).json({Success: "Successful: Record was added!."});
    });
});

// (6) update an existing record by movie name
// name URI: http://localhost:port/Name
app.put('/:Name', (request, response) => {
    const name = request.params.Name;
    const sqlQuery = `UPDATE MOVIES SET Name = ?, ReleaseDate = ?,
    Rating = ?, Director = ?, Genre = ?
    WHERE NAME = ? ;`;
    const values = [request.body.Name, request.body.ReleaseDate, request.body.Rating,
     request.body.Director, request.body.Genre];
    console.log(sqlQuery); // for debugging purposes:
    dbConnection.query(sqlQuery, [...values, name], (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Failed: Record was not added."});
    }
    return response.status(200).json({Success: "Successful: Record was updated!."});
    });
});

// (7) Delete a record by movie name
// movie URI: http://localhost:port/Name
app.delete('/:Name', (request, response) => {
    const name = request.params.Name;
    const sqlQuery = "DELETE FROM Movies WHERE NAME = ? ; ";
    dbConnection.query(sqlQuery, name, (err, result) => {
    if (err) {
    return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
    return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
    });

app.listen(2000, () => {
    console.log("Express server is running and listening");
}); 


