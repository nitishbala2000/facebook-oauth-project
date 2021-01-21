import './App.css';

import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import CustomNavBar from "./components/CustomNavBar/CustomNavBar";
import HomePage from "./components/HomePage/HomePage";
import MainPage from "./components/MainPage/MainPage";
import {Switch, Route} from "react-router-dom";

class App extends Component {



  componentDidMount() {

    window.fbAsyncInit = () => {
      window.FB.init({
        appId            : process.env.REACE_APP_FACEBOOK_APP_ID,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v9.0'
      })


      window.FB.getLoginStatus(response => {
        console.log(response);
      });
    }
    
  }



  render() {

    return (
      <BrowserRouter>
        <CustomNavBar/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/mainPage" exact component={MainPage}/>
          
        </Switch>
        

      </BrowserRouter>
    )
  }
}



export default App;
