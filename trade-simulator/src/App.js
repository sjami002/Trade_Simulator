import React, { Component } from "react";
import logo from "./logo.svg";
import NavBar from "./NavBar";
import MainContainer from "./MainContainer";
import NewsContainer from "./NewsContainer";
import UserDetails from "./UserDetails";
import StockDisplayContainer from "./StockDisplayContainer";
import { ActionCableConsumer } from "react-actioncable-provider";
import "./App.css";

class App extends Component {
  state = {
    selectedView: "home",
    stocks: [],
    user: {},
    budget: 0,
    transactions: [],
    searchTerm: ""
  };

  changeView = newView => {
    this.setState({
      selectedView: newView
    });
  };

  handleResponse = event => {
    console.log(event);
    this.setState({
      stocks: event
    });
  };

  handleSearchChange = event => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleBuy = buyTransaction => {
    this.setState({
      transactions: [...this.state.transactions, buyTransaction]
    });
  };

  handleBudgetPatch = newBudget => {
    console.log("hola");
  };

  renderView = () => {
    switch (this.state.selectedView) {
      case "home":
        return (
          <StockDisplayContainer
            handleBuy={this.handleBuy}
            handleBudgetPatch={this.handleBudgetPatch}
            stocks={this.state.stocks.filter(stock => {
              return (
                stock.name
                  .toLowerCase()
                  .includes(this.state.searchTerm.toLowerCase()) ||
                stock.symbol
                  .toLowerCase()
                  .includes(this.state.searchTerm.toLowerCase())
              );
            })}
            user={this.state.user}
          />
        );
      case "simulator":
        return (
          <MainContainer
            user={this.state.user}
            transactions={this.state.transactions}
          />
        );
      case "user":
        return (
          <UserDetails
            user={this.state.user}
            transactions={this.state.transactions}
          />
        );
      case "news":
        return (
          <NewsContainer
            user={this.state.user}
            stocks={this.state.stocks}
            transactions={this.state.transactions}
          />
        );
    }
  };

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(data => {
        this.setState({
          stocks: data
        });
      });

    fetch("http://localhost:3000/users/10")
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data
        });
      });

    fetch("http://localhost:3000/transactions")
      .then(res => res.json())
      .then(data => {
        this.setState({
          transactions: data
        });
      });
  }

  render() {
    return (
      <div>
        <NavBar
          changeView={this.changeView}
          stocks={this.state.stocks}
          handleSearchChange={this.handleSearchChange}
          searchTerm={this.state.searchTerm}
        />
        <ActionCableConsumer
          channel={{ channel: "StockChannel" }}
          onReceived={this.handleResponse}
        />
        {this.renderView()}
      </div>
    );
  }
}

export default App;

// onReceived={(a, b, c) => console.log("hiiiii", a, b, c)}

// componentDidMount() {
//   fetch(
//     "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo"
//   )
//     .then(res => res.json())
//     .then(data => {
//       this.setState({
//         stocks: data["Time Series (5min)"]
//       });
//     });
// }
//
// render() {
//   // console.log(this.state.stocks);
//   const stocksObj = this.state.stocks;
//   console.log(stocksObj);
//   let value;
//
//   Object.keys(stocksObj).forEach(key => {
//     let open = stocksObj[key]["1. open"];
//     let high = stocksObj[key]["2. high"];
//     let low = stocksObj[key]["3. low"];
//     let close = stocksObj[key]["4. close"];
//     console.log(open, high, low, close);
//     return value;
//   });
//
//   console.log(value);
//
//   return (
//     <div>
//       <NavBar changeView={this.changeView} />
//       {this.renderView()}
//     </div>
//   );
// }
