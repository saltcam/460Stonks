const express = require("express")
const cors = require("cors")
// retrieve the MySQL DB Configuration Module
const dbConnection = require("./config")
// use this library for parsing HTTP body requests
var bodyParser = require('body-parser');
const https = require('https');


var app = express(express.json); 

app.use(cors());
app.use(bodyParser.json());





// (1) Retrieves stock info based on inputted stock symbol. used in Service.js
app.get('/stock-info/:symbol', (req, res) => {
    const { symbol } = req.params;
    const ALPHA_VANTAGE_API_KEY = 'cn6i6k1r01qt2at49vtgcn6i6k1r01qt2at49vu0';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;

    https.get(url, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                res.json(parsedData);
            } catch (e) {
                res.status(500).json({ message: 'Error parsing JSON response from Alpha Vantage' });
            }
        });

    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
        res.status(500).json({ message: 'Error fetching stock information from Alpha Vantage' });
    });
});


// (2) Retrieves all stock information to display the stock price fluctuation graph. Used in Stock.js
app.get('/stock-graph/:symbol', (req, res) => {
    const { symbol } = req.params;
    const ALPHA_VANTAGE_API_KEY = '8XSVL3X8346AJ8Q7';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`;

    https.get(url, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            try {
                const parsedData = JSON.parse(data);
                res.json(parsedData);
            } catch (e) {
                res.status(500).json({ message: 'Error parsing JSON response from Alpha Vantage' });
            }
        });

    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
        res.status(500).json({ message: 'Error fetching stock information from Alpha Vantage' });
    });
});


// (3) Retrieves all records in Stock table (all the current user's stocks)
app.get('/owned-stocks', (request, response) => {
    const sqlQuery = "SELECT * FROM Stocks;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
    return response.status(200).json(result);
    });
});


// (4) Adds all owned stock prices - portfolio value
app.get('/portfolio-value', (request, response) => {
    const sqlQuery = "SELECT SUM(CurrentPrice) AS TotalCurrentPrice FROM Stocks;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
    return response.status(200).json(result);
    });
});


// (5) Returns the number all owned stock prices 
app.get('/stock-count', (request, response) => {
    const sqlQuery = "SELECT COUNT(*) AS TotalRows FROM Stocks;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); 
    return response.status(200).json(result);
    });
});


// (6) Retrieves Account Login info. response is Username and Password in JSON format
app.get('/portfolio-value', (request, response) => {
    const sqlQuery = "SELECT Username, Password FROM users;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); 
    return response.status(200).json(result);
    });
});


// (7) insert a new stock by stock symbol
app.post('/buy-stock', (request, response) => {
    const sqlQuery = 'INSERT INTO Stock VALUES (?);';
    const values = [request.body.Symbol, request.body.PriceBought, request.body.CurrentPrice];
    dbConnection.query(sqlQuery, [values], (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Failed: Record was not added."});
    }
    return response.status(200).json({Success: "Successful: Record was added!."});
    });
});


// (8) Delete a stock, called when user sells a stock
app.delete('/sell-stock', (request, response) => {
    const Symbol = request.params.Symbol;
    const sqlQuery = "DELETE FROM Stocks WHERE Symbol = ? ; ";
    dbConnection.query(sqlQuery, Symbol, (err, result) => {
    if (err) {
    return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
    return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
});


// (9) update the current price of an owned stock 
app.put('/update-current-price/:Symbol', (request, response) => {
    const Symbol = request.params.Symbol; 
    const sqlQuery = `UPDATE Stocks SET CurrentPrice = ? WHERE Name = ?;`;
    const values = [request.body.CurrentPrice, Symbol];

    dbConnection.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error(err);
            return response.status(400).json({Error: "Failed: Record was not updated."});
        }
        if (result.affectedRows === 0) {
            return response.status(404).json({Error: "Not Found: Stock was not found."});
        }
        return response.status(200).json({Success: "Successful: Record was updated!"});
    });
});


// (10) update the password to something new 
app.put('/update-password', (request, response) => {
    const newPassword = request.body.Password;
    const sqlQuery = `UPDATE users SET Password = ?;`;
    dbConnection.query(sqlQuery, [newPassword], (err, result) => {
        if (err) {
            console.error(err);
            return response.status(400).json({Error: "Failed: Password was not updated."});
        }
        return response.status(200).json({Success: "Successful: Password was updated!"});
    });
});


// (11) update the buying power, called when a stock is bought or sold 
app.put('/update-buying-power', (request, response) => {
    const newBuyingPower = request.body.BuyingPower; 
    const sqlQuery = `UPDATE users SET BuyingPower = ?;`;
    dbConnection.query(sqlQuery, [newBuyingPower], (err, result) => {
        if (err) {
            console.error(err);
            return response.status(400).json({Error: "Failed: BuyingPower was not updated."});
        }
        return response.status(200).json({Success: "Successful: BuyingPower was updated!"});
    });
});


 app.listen(2000, () => {
     console.log("Express server is running and listening");
 }); 


