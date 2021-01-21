import axios from "../axios_instance";
import * as actionTypes from "./actionTypes";
import jwt from "jsonwebtoken";


let timerVariable;

const refreshJwt = () => {
    return dispatch => {
        window.FB.getLoginStatus(response => {
            console.log(response);
            if (response.status === "connected") {
              const accessToken = response.authResponse.accessToken;
              const id = response.authResponse.userID;
              dispatch(getJwtToken(accessToken, id));
            } 
        })
    }
};

export const getJwtToken = (accessToken, id, callback) => {
    return dispatch => {
        axios.post("/getJwtToken", {token : accessToken, id : id})
        .then(res => {

            const token = res.data;

            const key = process.env.REACT_APP_JWT_KEY;
            const algorithm = process.env.REACT_APP_JWT_ALGORITHM;
            
            const decodedToken = jwt.verify(token, key , {algorithms : [algorithm]});
            console.log(decodedToken);
            
            const expiryTime = decodedToken.expiryTime;
            const currentTime = Date.now() / 1000;
            
            //timeRemaining is in seconds. We'll refresh the token one minute before it expires
            const timeRemaining = expiryTime - currentTime - 60;
            
            timerVariable = setTimeout(() => {
                dispatch(refreshJwt());
            }, timeRemaining * 1000)

            dispatch({type : actionTypes.SET_TOKEN, value : token});
            if (callback) {
                callback();
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}


export const login = () => {
    return dispatch => {
        window.FB.login(response => {
            if (response.status === "connected") {
                console.log(response);
                const accessToken = response.authResponse.accessToken;
                const id = response.authResponse.userID;
                dispatch(getJwtToken(accessToken, id));
            }
        }, {scope : "public_profile,email"});
    }
}

export const logout = () => {
    return dispatch => {

        if (timerVariable) {
            clearTimeout(timerVariable);
        }


        dispatch({type : actionTypes.SET_LOGGING_OUT});
        window.FB.api('/me/permissions', 'delete', null, () => {
            window.FB.logout(response => {
                dispatch({type : actionTypes.DISCARD_TOKEN});
            });
        });
    }
}