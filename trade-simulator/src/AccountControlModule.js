import React, { Component } from "react";
import cryptoTrans from "./icons8-dollar-bitcoin-exchange-50.png";
import cryptoLogo from "./icons8-bitcoin-50.png";
import profile from "./icons8-profile-50.png";
import portfolio from "./icons8-combo-chart-80.png";

class AccountControlModule extends Component {
  refreshPage = () => {
    window.location.reload(false);
  };
  render() {
    return (
      <div className="account-controls">
        <button
          onClick={() => {
            this.props.changeView("home");
            this.refreshPage();
          }}
          style={{ cursor: "pointer" }}
        >
          <img className="button-icon" src={cryptoLogo} alt="icon" />
          <br />
          Currency
        </button>
        <button
          onClick={() => this.props.changeView("simulator")}
          style={{ cursor: "pointer" }}
        >
          <img className="button-icon" src={cryptoTrans} alt="icon" />
          <br />
          Transactions
        </button>

        <button
          onClick={() => this.props.changeView("news")}
          style={{ cursor: "pointer" }}
        >
          <img className="button-icon" src={portfolio} alt="icon" />
          <br />
          Portfolio
        </button>

        <button
          onClick={() => this.props.changeView("user")}
          style={{ cursor: "pointer" }}
        >
          <img className="button-icon" src={profile} alt="icon" />
          <br />
          Profile
        </button>
      </div>
    );
  }
}

export default AccountControlModule;

// https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-bell-outline-128.png

// https://image.flaticon.com/icons/svg/1875/1875035.svg
