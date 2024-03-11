import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const MyStocks = () => {

const [stocks, setStocks] = useState([]);

useEffect(() => {
    const getAllStocksInfo = async () => {
        try {
            const response = await axios.get("http://localhost:2000/owned-stocks", {
                // Add any additional headers or query parameters if needed
            });
            setStocks(response.data);
        } catch (error) {
            console.error("Error fetching stocks:", error);
        }
    };

    getAllStocksInfo();
}, []);

    const handleDelete = async (Name) => {
        const deleteConfirmed = window.confirm('Are you sure about the deletion of this record permanently from the database?');
        if (deleteConfirmed) {
            try {
                await axios.delete('http://localhost:2000/' + Name);
                console.log(Name);
                window.location.reload()
            } catch (err) {
                console.log("Error:" + err);
            }
        }
    };

return (
    <div className="container">
        <h2 className="w-100 d-flex justify-content-center p-3">Stock Portfolio</h2>
        <div className="row">
            <div className='col-md-12'>
                <h3>View All The Owned Stocks</h3>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        stocks.map((stock, s) => {
                            return (
                                <tr key={s}>
                                    <td>{stock.Symbol}</td>
                                    <td>{stock.Price}</td>
                                    <td>
                                        <Link onClick={() => handleDelete(stock.Symbol)} className="btn btn-danger">Sell</Link>
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