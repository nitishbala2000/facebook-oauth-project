import axios from "../axios_instance";
import * as actionTypes from "./actionTypes";


export const login = () => {
    return dispatch => {
        window.FB.login(response => {
            if (response.status === "connected") {
                console.log(response);
                const accessToken = response.authResponse.accessToken;
                const id = response.authResponse.userID;
                axios.post("/getJwtToken", {token : accessToken, id : id})
                .then(res => {
                    dispatch({type : actionTypes.SET_TOKEN, value: res.data})
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }, {scope : "public_profile,email"});
    }
}

export const logout = () => {
    return dispatch => {
        window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout(respose => {
            console.log("Logout response: " + respose);
            dispatch({type : actionTypes.DISCARD_TOKEN})
        }));
    }
}