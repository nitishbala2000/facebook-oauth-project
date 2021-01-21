import * as actionTypes from "./actionTypes";


const initialState = {
    jwtToken : null
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
                jwtToken : null
            }
        }

        default : {
            return state;
        }
    }
}

export default reducer;