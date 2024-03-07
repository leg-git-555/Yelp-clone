import { csrfFetch } from "./csrf";

//action types
const GET_BUSINESSES = 'businesses/getBusinesses'
const DELETE_A_BUSINESS = 'businesses/deleteABusiness'

//actions
const actionGetBusinesses = (payload) => {
    return {
        type: GET_BUSINESSES,
        payload
    }
}

export const actionDeleteABusiness = (payload) => {
    console.log('inside action', payload)
    return {
        type: DELETE_A_BUSINESS,
        payload
    }
}

//thunks
export const thunkGetBusinesses = () => async (dispatch) => {

    const res = await csrfFetch("/api/businesses/")
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return
        }
        
        dispatch(actionGetBusinesses(data))

    }
}


//reducer

const initialState = { businesses: {} };

export function businessesReducer (state = initialState, action) {
    switch (action.type) {
        case GET_BUSINESSES: {
            //normalize data
            let bRay = action.payload.businesses
            let bObj = {}
            bRay.forEach(b => bObj[b.id] = b)
            
            return {...state, businesses: bObj}
        } case DELETE_A_BUSINESS: {
            console.log('inside reducer', action.payload)
            console.log(state)
            console.log(state.businesses)
            let newState = {...state}
            delete newState.businesses[action.payload]
            
            return newState
        }
        default:
            return state
    }
}


