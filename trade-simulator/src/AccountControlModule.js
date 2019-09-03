import React, { Component } from "react";

class AccountControlModule extends Component {
  render() {
    return (
      <div className="account-controls">
        <button
          onClick={() => this.props.changeView("home")}
          style={{ cursor: "pointer" }}
        >
          <img
            className="button-icon"
            src="https://cdn3.iconfinder.com/data/icons/bitcoin-cryptocurrency-mining/100/bitcoin-07-512.png"
            alt="icon"
          />
          <br />
          Cryptos
        </button>
        <button
          onClick={() => this.props.changeView("simulator")}
          style={{ cursor: "pointer" }}
        >
          <img
            className="button-icon"
            src="https://image.flaticon.com/icons/svg/1875/1875035.svg"
            alt="icon"
          />
          <br />
          Transactions
        </button>

        <button
          onClick={() => this.props.changeView("news")}
          style={{ cursor: "pointer" }}
        >
          <img
            className="button-icon"
            src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-outline-128.png"
            alt="icon"
          />
          <br />
          Portfolio
        </button>

        <button
          onClick={() => this.props.changeView("user")}
          style={{ cursor: "pointer" }}
        >
          <img
            className="button-icon"
            src="https://image.flaticon.com/icons/png/128/126/126486.png"
            alt="icon"
          />
          <br />
          Profile
        </button>
      </div>
    );
  }
}

export default AccountControlModule;
