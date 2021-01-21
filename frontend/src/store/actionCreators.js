import axios from "../axios_instance";
import * as actionTypes from "./actionTypes";


export const getJwtToken = (accessToken, id, callback) => {
    return dispatch => {
        axios.post("/getJwtToken", {token : accessToken, id : id})
        .then(res => {
            dispatch({type : actionTypes.SET_TOKEN, value: res.data});
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
        dispatch({type : actionTypes.SET_LOGGING_OUT});
        window.FB.api('/me/permissions', 'delete', null, () => {
            window.FB.logout(response => {
                dispatch({type : actionTypes.DISCARD_TOKEN});
            });
        });
    }
}