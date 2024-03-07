import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component /*({inputValue})*/{

 
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(this.props.stockSymbol);
    //const API_KEY = '8XSVL3X8346AJ8Q7';
   let StockSymbol = 'IBM';
    let API_Call = `http://localhost:2000/stock-graph/${StockSymbol}`;
    console.log("stock api call" + API_Call);
    
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
         //   console.log("data");
          console.log(data);

          for (var key in data['Time Series (Daily)']) {
           stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }

           console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render(StockSymbol) {
    return (
      <div>
        <h1>{StockSymbol}</h1>
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
        layout={ {width: 1000, height: 550} }
      />
      </div>
    )
  }
}

export default Stock;


