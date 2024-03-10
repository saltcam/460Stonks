const express = require("express")
const cors = require("cors")
var bodyParser = require('body-parser');
const https = require('https');
const router = express.Router();

router.use(express.json()); 

router.use(cors());
router.use(bodyParser.json());

/**
 * @swagger
 {
  "/stock-info/{symbol}": {
    "get": {
      "summary": "Retrieves stock info based on inputted stock symbol.",
      "parameters": [
        {
          "in": "path",
          "name": "symbol",
          "required": true,
          "schema": {
            "type": "string"
          }
        }
      ],
      "responses": {
        "200": {
          "description": "Stock information retrieved successfully."
        },
        "500": {
          "description": "Error retrieving stock information."
        }
      }
    }
  }
} 
*/
// (1) Retrieves stock info based on inputted stock symbol. used in Service.js
router.get('/stock-info/:symbol', (req, res) => {
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

/**
 * @swagger
 * 
 * {
  "/stock-graph/{symbol}": {
    "get": {
      "summary": "Retrieves all stock information to display the stock price fluctuation graph.",
      "description": "This endpoint retrieves all stock information necessary to display the stock price fluctuation graph.",
      "parameters": [
        {
          "in": "path",
          "name": "symbol",
          "required": true,
          "description": "The stock symbol for which to retrieve information."
        }
      ],
      "responses": {
        "200": {
          "description": "Successful response with stock information.",

        },
        "500": {
          "description": "Internal server error. Error retrieving stock information.",
          
        }
      }
    }
  }
}
 * 
 * 
 */


// (2) Retrieves all stock information to display the stock price fluctuation graph. Used in Stock.js
router.get('/stock-graph/:symbol', (req, res) => {
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

module.exports = router;