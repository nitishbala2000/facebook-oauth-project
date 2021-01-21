import * as actionTypes from "./actionTypes";


const initialState = {
    jwtToken : null,
    isLoggingOut : false
}

const reducer = (state=initialState, action) => {

    switch (action.type) {

        case (actionTypes.SET_TOKEN) : {
            return {
                ...state,
                jwtToken: action.value
            }
        }

        case (actionTypes.DISCARD_TOKEN) : {
            return {
                ...state,
                isLoggingOut : false,
                jwtToken : null
            }
        }

        case (actionTypes.SET_LOGGING_OUT) : {
            return {
                ...state,
                isLoggingOut: true
            }
        }

        default : {
            return state;
        }
    }
}

export default reducer;