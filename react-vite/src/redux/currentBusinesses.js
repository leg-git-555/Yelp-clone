import { csrfFetch } from "./csrf";

//action type
const GET_CURRENT_BUSINESSES = 'currentBusinesses/GET_CURRENT_BUSINESSES'

//actions
const actionGetCurrentBusinesses = (payload) => {
    return {
        type: GET_CURRENT_BUSINESSES,
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
            return {...state, ...bObj}
        }
        default:
            return state
    }
}


