import React, { Component } from "react";
import AccountControlModule from "./AccountControlModule";
import SearchBar from "./SearchBar";
import logo from "./5852e3b6-d2c5-49f5-8669-1ac97b0e5519_200x200.png";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div
          className="logo"
          onClick={() => this.props.changeView("home")}
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
