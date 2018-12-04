import React, { Component } from "react";

import SearchField from "./SearchField";
import logo from "../img/Logo.png";
import ProfilePanel from "./ProfilePanel";

import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand navbar-light ">
        <div className="container">
          <SearchField onSearchChanged={this.props.onSearchChanged} />
          <div className="col-6 text-center">
            <Link to="/">
              <img src={logo} alt="logo"/>
            </Link>
          </div>
          <Link to="/signin">
          <button className="btn btn-primary btn-lg">Create</button>
            </Link>
          
          <ProfilePanel
          onNameSignin={this.props.onNameSignin}
          onCMTSignin={this.props.onCMTSignin}
            username={this.props.username}
            onLogin={this.props.onLogin}
          />
        </div>
      </div>
    );
  }
}

export default NavBar;
