import './App.css';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CustomNavBar from "./components/CustomNavBar/CustomNavBar";
import HomePage from "./components/HomePage/HomePage";
import MainPage from "./components/MainPage/MainPage";
import { Switch, Route } from "react-router-dom";
import ErrorPage from './components/ErrorPage/ErrorPage';
import * as actionCreators from "./store/actionCreators";

class App extends Component {

  componentDidMount() {

    window.addEventListener("beforeunload", (event) => {
      event.returnValue = "Write something clever here";
      this.props.logout()
    });

  }




  render() {

    if (this.props.jwtToken) {
      return (
        <BrowserRouter>
          <CustomNavBar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/mainPage" exact component={MainPage} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      ) 
    } else {
      return (
        <BrowserRouter>
          <CustomNavBar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    jwtToken: state.jwtToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
