import React, { Component } from 'react';

import axios from './axios';



import { ROOT_API } from './statics';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";

import HomeScreen from "./containers/HomeScreen";
import DetailScreen from "./containers/DetailScreen";
import NewGame from './components/NewGame';
class App extends Component {
  state = {
    showImg: true,
    message: "Hello world",
    num: 0,
    citizen: null,
  
    loading: true
  }

  _onLogin = () => {
    axios({
      url: `${ROOT_API}/api/auth/login`,
      method: "POST",
      data: {
        name: this.state.username1,
        citizenId: this.state.cmt
      }
    }).then(response => {
      if (response.data.success) {
        this.setState({
          username: response.data.citizenFound.name,

        })
        window.location.href = `http://localhost:3000/ `

      }
      // toggleLoading(false);
    }).catch(error => {

      console.log(error)


    });
  };
  _onNameSignin = text => this.setState({ username1: text });
  _onCMTSignin = text => this.setState({ cmt: text });
  componentDidMount() {

    axios({
      url: `${ROOT_API}/api/auth`,
      method: "GET",

    }).then(response => {
      this.setState({
        username: response.data.citizenFound.name,
        
      })
      
      
      // window.location.href = `http://localhost:3000/citizen/${response.data.citizenFound.id} `
      // toggleLoading(false);
    }).catch(error => {

      console.log(error)


    });

  }

  render() {
   

    return (

      <BrowserRouter>
        <div className="App">

          <Route
            exact
            path="/"
            render={props => {
              return <HomeScreen
                {...props}
                
                onNameSignin={this._onNameSignin}
                onCMTSignin={this._onCMTSignin}
                username={this.state.username}
                onLogin={this._onLogin}
              />;
            }}
          />
          <Route
            path="/citizens/:citizenId"
            render={props => {
              return <DetailScreen
                {...props}
                onNameSignin={this._onNameSignin}
                onCMTSignin={this._onCMTSignin}
                username={this.state.username}
                onLogin={this._onLogin}
              />;
            }}
          />

          <Route
            path="/signin"
            render={props => {
              return <NewGame
                {...props}
                onNameSignin={this._onNameSignin}
                onCMTSignin={this._onCMTSignin}
                username={this.state.username}
                onLogin={this._onLogin}
              />;
            }}
          />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;