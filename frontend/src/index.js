import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import reducer from "./store/reducer";
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

function initFacebookSdk() {
  return new Promise(resolve => {
      // wait for facebook sdk to initialize before starting the react app
      window.fbAsyncInit = function () {
          window.FB.init({
              appId: facebookAppId,
              cookie: true,
              xfbml: true,
              version: 'v9.0'
          });

          // auto authenticate with the api if already logged in with facebook
          window.FB.getLoginStatus(response => {
            console.log(response);
            resolve();
          });
      };

      // load facebook sdk script
      (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));    

  });
}

initFacebookSdk()
.then(() => {
  ReactDOM.render(
    <React.StrictMode>
       <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'))
});


