import { csrfFetch } from "./csrf";

//action types
const GET_BUSINESSES = 'businesses/getBusinesses'

//actions
const actionGetBusinesses = (payload) => {
    return {
        type: GET_BUSINESSES,
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
        }
        default:
            return state
    }
}


