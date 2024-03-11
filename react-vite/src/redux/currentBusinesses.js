import { csrfFetch } from "./csrf";

//action type
const GET_CURRENT_BUSINESSES = 'currentBusinesses/GET_CURRENT_BUSINESSES'
const DELETE_A_CURRENT_BUSINESS = 'currentBusinesses/DELETE_A_CURRENT_BUSINESS'

//actions
const actionGetCurrentBusinesses = (payload) => {
    return {
        type: GET_CURRENT_BUSINESSES,
        payload
    }
}

export const actionDeleteACurrentBusiness = (payload) => {
    return {
        type: DELETE_A_CURRENT_BUSINESS,
        payload
    }
}



//thunk
export const thunkGetCurrentBusinesses = () => async (dispatch) => {

    const res = await csrfFetch("/api/businesses/current")

    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return
        }
        dispatch(actionGetCurrentBusinesses(data))
    }
    
}

// reducer
const currentBusinesses = {}

export function currentBusinessesReducer (state = currentBusinesses, action) {
    switch (action.type) {
        case GET_CURRENT_BUSINESSES: {

            let bRay = action.payload
            let bObj = {}
            bRay.forEach(b => bObj[b.id] = b)
            //cannot spread prior state or switching between accounts breaks
            return {...bObj}
        } case DELETE_A_CURRENT_BUSINESS: {
        
            let newState = {...state}
            delete newState[action.payload]
            
            return newState
        }
        default:
            return state
    }
}


