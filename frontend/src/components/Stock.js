import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
        };
    }

    componentDidMount() {
        this.fetchStock(this.props.StockSymbol);
    }

    componentDidUpdate(prevProps) {
        if (this.props.StockSymbol !== prevProps.StockSymbol) {
            this.fetchStock(this.props.StockSymbol);
        }
    }

    fetchStock(stockSymbol) {
        const pointerToThis = this;
        console.log(stockSymbol);
        let API_Call = `http://localhost:2000/stock-graph/${stockSymbol}`;
        console.log("stock api call" + API_Call);

        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(API_Call)
            .then(response => response.json())
            .then(data => {
                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                }

                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues: stockChartYValuesFunction,
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Stock Data for {this.props.StockSymbol}</h1>
                <Plot
                    data={[
                        {
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={{width: 1000, height: 550}}
                />
            </div>
        );
    }
}

export default Stock;
