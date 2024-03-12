import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const MyStocks = () => {

    const [stocks, setStocks] = useState([]);
    const [buyingPower, setBuyingPower] = useState(0);

    useEffect(() => {
        const getAllStocksInfo = async () => {
            try {
                const response = await axios.get("http://localhost:2000/owned-stocks", {
                    // Add any additional headers or query parameters if needed
                });
                setStocks(response.data);
                setStocks(response.data);
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
            console.log(stocks);


            let newPrice = 0;

console.log("About to loop");

// stocks.map((stock, s) => {
//
// });


            for (let i = 0; i < stocks.length; i++) {
                // console.log("looping! " + i);
                // console.log("Symbol:", stocks[i].Symbol, "CurrentPrice:", stocks[i].CurrentPrice);

                try {
                    const response = await axios.get(`http://localhost:2000/stock-info/${stocks[i].Symbol}`);
                    const data = response.data['Global Quote'];
                    newPrice = data['05. price'];
                    // console.log("new Price: " + newPrice);

                } catch (error) {
                    console.error("retrieving current price:", error);
                }

                try {
                    await axios.put(`http://localhost:2000/update-current-price/${stocks[i].Symbol}`,
                        { CurrentPrice: newPrice });
                } catch (error) {
                    console.error("Error updating current stock prices:", error);

                }

            }

        };



        getAllStocksInfo();
    }, []);

    const handleSell = async (stock) => {
        let localBP = 0;
        let sold = false;
        const sellConfirmed = window.confirm('Are you sure you want to sell this stock?');
        if (sellConfirmed) {

            try {
                const responseBP = await axios.get('http://localhost:2000/check-buying-power');
                const buyingPowerData = responseBP.data; // Assuming the response contains an array with one object
                if (buyingPowerData.length > 0) {
                    localBP = parseFloat(buyingPowerData[0].BuyingPower);
                }
            } catch (error) {
                console.error('Error fetching buying power:', error);
            }



            try {
                console.log(stock);
                localBP += stock.CurrentPrice;
                await axios.delete(decodeURI('http://localhost:2000/sell-stock/') + stock.Symbol);
                sold = true;
                // Reload the page or update state to reflect changes
                // window.location.reload();
            } catch (error) {
                console.error("Error selling stock:", error);
            }

            if (sold) { // make sure the sell was successful before updating the buying power

                try {
                    console.log("new buying power: " + localBP);
                    await axios.put('http://localhost:2000/update-buying-power', {BuyingPower: localBP});
                    window.location.reload();
                    // setBuyingPower(localBP);
                    // console.log("new buyingPower: " + localBP);
                    alert("Stock sell successful!");
                } catch (error) {
                    console.error('Error updating buying power:', error);
                }
            }
        }
    };


    return (
        <div className="container">
            <h2 className="w-100 d-flex justify-content-center p-3">Stock Portfolio</h2>
            <div className="row">
                <div className='col-md-12'>
                    <h3>My Stocks</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Stock</th>
                            <th>Price Bought</th>
                            <th>Current Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            stocks.map((stock, s) => {
                                return (
                                    <tr key={s}>
                                        <td>{stock.Symbol}</td>
                                        <td>{stock.PriceBought}</td>
                                        <td>{stock.CurrentPrice}</td>
                                        <td>
                                            <Link onClick={() => handleSell(stock)} className="btn btn-danger">Sell</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

};

export default MyStocks;