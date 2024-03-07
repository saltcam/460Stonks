import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stock from './Stock';

function Service({ setStockSymbol }) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setStockSymbol(e.target.value.toUpperCase()); // Inform the parent component of the change
      };


    const [stockData, setStockData] = useState(null);
    const [validSymbol, setValidSymbol] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (inputValue.length >= 1) {
                try {
                    const response = await axios.get(`http://localhost:2000/stock-info/${inputValue}`);
                    const data = response.data['Global Quote'];
                    console.log(data);
                    if (data) {
                        setStockData(data);
                        setValidSymbol(true);
                    } else {
                        setStockData(null);
                        setValidSymbol(false);
                    }
                } catch (error) {
                    console.error('Error fetching stock data:', error);
                    setStockData(null);
                    setValidSymbol(false);
                }
            }
        };

        fetchData();
    }, [inputValue]);

    const handleBuy = () => {
        // Logic for buy button
    };

    const handleSell = () => {
        // Logic for sell button
    };

    return (
        <div className="container searchContainer">
            <div className="card mb-3">
                <h3 className="card-header">Stock Market Data</h3>
                <div className="card-body">
                    <h5 className="card-title">Live stock data</h5>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                            className="form-control"
                            autoComplete='off'
                            placeholder="Enter stock symbol..." />
                    </div>
                </div>
                <div className="card-footer text-muted">
                    {stockData && (
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Symbol:</strong> {stockData['01. symbol']}
                            </p>
                            <p className="card-text">
                                <strong>Price:</strong> {stockData['05. price']}
                            </p>
                            <p className="card-text">
                                <strong>Last Refreshed:</strong> {stockData['07. latest trading day']}
                            </p>
                            <Stock 
                                StockSymbol = {inputValue} 
                            />              
                        </div>
                    )}
                    <div className="card-body">
                        <button className="btn btn-primary mr-2" disabled={!validSymbol || !inputValue} onClick={handleBuy}>Buy</button>
                        <button className="btn btn-danger" disabled={!validSymbol || !inputValue} onClick={handleSell}>Sell</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
        
        
    );
}

export default Service;
