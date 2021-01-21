
import './App.css';

import React, { Component } from 'react';

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

    return <p>Hi</p>
  }
}



export default App;
