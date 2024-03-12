import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PortfolioState (){
    const [portfolioValue, setPortfolioValue] = useState('');
    const [buyingPower, setBuyingPower] = useState(0);

    useEffect(() => {
        // Define the fetchData function inside useEffect
        const fetchData = async () => {
            try {
                const responseBP = await axios.get('http://localhost:2000/check-buying-power');
                const buyingPowerData = responseBP.data; // Assuming the response contains an array with one object
                if (buyingPowerData.length > 0) {
                    setBuyingPower(parseFloat(buyingPowerData[0].BuyingPower));
                }
            } catch (error) {
                console.error('Error fetching buying power:', error);
            }

            try {
                const responsePV = await axios.get('http://localhost:2000/portfolio-value');
                const portfolioData = responsePV.data; // Assuming the response contains an array with one object
                // Check if portfolioData has at least one item and that TotalCurrentPrice is a number
                if (portfolioData.length > 0 && !isNaN(parseFloat(portfolioData[0].TotalCurrentPrice))) {
                    setPortfolioValue(parseFloat(portfolioData[0].TotalCurrentPrice));
                } else {
                    // Set to 0 if the array is empty or TotalCurrentPrice is not a number
                    setPortfolioValue(0);
                }
            } catch (error) {
                console.error('Error fetching portfolio value:', error);
            }
        };

        // Call fetchData initially
        fetchData();

        // Set up the interval to call fetchData every specified number of milliseconds
        const intervalId = setInterval(fetchData, 5000); // 5000 milliseconds = 5 seconds

        // Clean up the interval on unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect will only run on mount and cleanup runs on unmount


    return (
        <div className="container searchContainer">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="financial-dashboard">
                        <h2>Financial Dashboard</h2>
                        <div className="dashboard-item">
                            <label>Buying Power: &nbsp;</label>
                            <span><strong>${buyingPower}</strong></span> {/* Bold and format buying power */}
                        </div>
                        <div className="dashboard-item">
                            <label>Portfolio Value: &nbsp;</label>
                            <span><strong>${portfolioValue}</strong></span> {/* Bold and format portfolio value */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PortfolioState;