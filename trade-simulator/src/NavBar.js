import React, { Component } from "react";
import AccountControlModule from "./AccountControlModule";
import SearchBar from "./SearchBar";
import logo from "./f5083b0f-88d0-42fb-b60b-ec6db79462cb_200x200.png";

class NavBar extends Component {
  refreshPage = () => {
    window.location.reload(false);
  };
  render() {
    return (
      <div className="navbar">
        <div
          className="logo"
          onClick={() => {
            this.props.changeView("home");
            this.refreshPage();
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ height: "75px", borderRadius: "15px" }}
          />
        </div>
        <SearchBar
          stocks={this.props.stocks}
          handleSearchChange={this.props.handleSearchChange}
          searchTerm={this.props.searchTerm}
        />
        <AccountControlModule changeView={this.props.changeView} />
      </div>
    );
  }
}

export default NavBar;
// https://cdn.pixabay.com/photo/2017/06/10/07/29/shield-2389246_1280.png
