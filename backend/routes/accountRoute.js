const express = require("express")
const cors = require("cors")
var bodyParser = require('body-parser');
const https = require('https');
const router = express.Router();
const dbConnection = require('../config');

router.use(express.json()); 

router.use(cors());
router.use(bodyParser.json());

/**
 * @swagger
 {
  "/owned-stocks": {
    "get": {
      "summary": "Retrieves all records in the Stocks table (all the current user's stocks).",
      "description": "This endpoint retrieves all records in the Stocks table, representing all the stocks owned by the current user.",
      "responses": {
        "200": {
          "description": "Successful response with the list of owned stocks."
        },
        "400": {
          "description": "Bad request. Error in the SQL statement. Please check."
        }
      }
    }
  }
}
 */
// (3) Retrieves all records in Stock table (all the current user's stocks)
router.get('/owned-stocks', (request, response) => {
    const sqlQuery = "SELECT * FROM Stocks;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
    return response.status(200).json(result);
    });
});

/**
 * @swagger
 * {
  "/portfolio-value": {
    "get": {
      "summary": "Adds all owned stock prices to calculate the portfolio value.",
      "description": "This endpoint calculates the total value of all the stocks owned by the current user.",
      "responses": {
        "200": {
          "description": "Successful response with the total portfolio value.",
          "schema": {
            "type": "object",
            "properties": {
              "TotalCurrentPrice": {
                "type": "number",
                "description": "The total value of all owned stocks."
              }
            }
          }
        },
        "400": {
          "description": "Bad request. Error in the SQL statement. Please check."
        }
      }
    }
  }
}
 */

// (4) Adds all owned stock prices - portfolio value
router.get('/portfolio-value', (request, response) => {
    const sqlQuery = "SELECT SUM(CurrentPrice) AS TotalCurrentPrice FROM Stocks;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); // send a custom header attribute
    return response.status(200).json(result);
    });
});

/**
 * @swagger
 * 
 * {
  "/stock-count": {
    "get": {
      "summary": "Returns the number of all owned stock prices.",
      "description": "This endpoint retrieves the total count of all the stocks owned by the current user.",
      "responses": {
        "200": {
          "description": "Successful response with the total count of owned stocks."
        },
        "400": {
          "description": "Bad request. Error in the SQL statement. Please check."
        }
      }
    }
  }
}
 */

// (5) Returns the number all owned stock prices 
router.get('/stock-count', (request, response) => {
    const sqlQuery = "SELECT COUNT(*) AS TotalRows FROM Stocks;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); 
    return response.status(200).json(result);
    });
});


/**
 * @swagger
 * 
 * {
  "/portfolio-value": {
    "get": {
      "summary": "Retrieves account login information.",
      "description": "This endpoint retrieves the username and password of all user accounts.",
      "responses": {
        "200": {
          "description": "Successful response with account login information.",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "Username": {
                      "type": "string",
                      "description": "The username of the account."
                    },
                    "Password": {
                      "type": "string",
                      "description": "The password of the account."
                    }
                  }
                }
              }
            }
          }
        },
        "400": {
          "description": "Bad request. Error in the SQL statement. Please check."
        }
      }
    }
  }
}
 */

// (6) Retrieves Account Login info. response is Username and Password in JSON format
router.get('/portfolio-value', (request, response) => {
    const sqlQuery = "SELECT Username, Password FROM users;";
    dbConnection.query(sqlQuery, (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Error in the SQL statement. Please check."});
    }
    response.setHeader('SQLQuery', sqlQuery); 
    return response.status(200).json(result);
    });
});

/**
 * @swagger
 * 
 * {
  "/buy-stock": {
    "post": {
      "summary": "Inserts a new stock by stock symbol.",
      "description": "This endpoint adds a new stock record to the database.",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "Symbol": {
                  "type": "string",
                  "description": "The symbol of the stock."
                },
                "PriceBought": {
                  "type": "number",
                  "description": "The price at which the stock was bought."
                },
                "CurrentPrice": {
                  "type": "number",
                  "description": "The current price of the stock."
                }
              },
              "required": ["Symbol", "PriceBought", "CurrentPrice"]
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Successful response. Record was added successfully."
        },
        "400": {
          "description": "Bad request. Failed to add record to the database."
        }
      }
    }
  }
}
 */

// (7) insert a new stock by stock symbol
router.post('/buy-stock', (request, response) => {
    const sqlQuery = 'INSERT INTO Stock VALUES (?);';
    const values = [request.body.Symbol, request.body.PriceBought, request.body.CurrentPrice];
    dbConnection.query(sqlQuery, [values], (err, result) => {
    if (err) {
    return response.status(400).json({Error: "Failed: Record was not added."});
    }
    return response.status(200).json({Success: "Successful: Record was added!."});
    });
});

/**
 * @swagger
 * {
  "/sell-stock": {
    "delete": {
      "summary": "Deletes a stock.",
      "description": "This endpoint removes a stock record from the database when a user sells a stock.",
      "parameters": [
        {
          "in": "query",
          "name": "Symbol",
          "required": true,
          "schema": {
            "type": "string"
          },
          "description": "The symbol of the stock to be deleted."
        }
      ],
      "responses": {
        "200": {
          "description": "Successful response. Record was deleted successfully."
        },
        "400": {
          "description": "Bad request. Failed to delete record from the database.",
        }
      }
    }
  }
}
 */

// (8) Delete a stock, called when user sells a stock
router.delete('/sell-stock', (request, response) => {
    const Symbol = request.params.Symbol;
    const sqlQuery = "DELETE FROM Stocks WHERE Symbol = ? ; ";
    dbConnection.query(sqlQuery, Symbol, (err, result) => {
    if (err) {
    return response.status(400).json({ Error: "Failed: Record was not deleted" });
    }
    return response.status(200).json({ Success: "Succcessful: Record was deleted!" });
    });
});

/**
 * @swagger
 * 
 * {
  "/update-current-price/{Symbol}": {
    "put": {
      "summary": "Updates the current price of an owned stock.",
      "description": "This endpoint updates the current price of a stock in the database.",
      "parameters": [
        {
          "in": "path",
          "name": "Symbol",
          "required": true,
          "schema": {
            "type": "string"
          },
          "description": "The symbol of the stock to be updated."
        }
      ],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "CurrentPrice": {
                  "type": "number",
                  "description": "The new current price of the stock."
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Successful response. Record was updated successfully."
        },
        "400": {
          "description": "Bad request. Failed to update record in the database.",
        },
        "404": {
          "description": "Not found. Stock was not found in the database.",
        }
      }
    }
  }
}
 */
// (9) update the current price of an owned stock 
router.put('/update-current-price/:Symbol', (request, response) => {
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

/**
 * @swagger
 * 
 * {
  "/update-password": {
    "put": {
      "summary": "Updates the password to something new.",
      "description": "This endpoint updates the password of a user in the database.",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "Password": {
                  "type": "string",
                  "description": "The new password."
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Successful response. Password was updated successfully."
        },
        "400": {
          "description": "Bad request. Failed to update password in the database."
        }
      }
    }
  }
}
 */
// (10) update the password to something new 
router.put('/update-password', (request, response) => {
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

/**
 * @swagger
 * {
  "/update-buying-power": {
    "put": {
      "summary": "Updates the buying power.",
      "description": "This endpoint updates the buying power of a user in the database.",
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "BuyingPower": {
                  "type": "number",
                  "description": "The new buying power."
                }
              }
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Successful response. Buying power was updated successfully."
        },
        "400": {
          "description": "Bad request. Failed to update buying power in the database."
        }
      }
    }
  }
}
 */

// (11) update the buying power, called when a stock is bought or sold 
router.put('/update-buying-power', (request, response) => {
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


module.exports = router;