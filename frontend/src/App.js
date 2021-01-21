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
import CustomSpinner from './components/CustomSpinner/CustomSpinner';

class App extends Component {

  state = {
    initialCheck : true
  }

  componentDidMount() {

    window.FB.getLoginStatus(response => {
      if (response.status === "connected") {
        const accessToken = response.authResponse.accessToken;
        const id = response.authResponse.userID;
        this.props.getJwtToken(accessToken, id, () => {
          this.setState({initialCheck : false})
        });
      } else {
        this.setState({initialCheck : false});
      }
    });

  }




  render() {

    if (this.state.initialCheck) {
      return <CustomSpinner style={{marginTop : "30vh"}}/>
    }

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
    getJwtToken : (accessToken, id, callback) => dispatch(actionCreators.getJwtToken(accessToken, id, callback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
