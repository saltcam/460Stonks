import React from 'react';
import Service from './Service';
import MyStocks from "./MyStocks";
import PortfolioStats from "./PortfolioStats";

function Main() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xs-6" style={{ 'maxWidth': '100%' }}>
                        <Service />
                        <PortfolioStats />
                        <MyStocks />
                    </div>
          
                </div>
                <div className="row">
                </div>
            </div>
        </>
    );
}

export default Main;
