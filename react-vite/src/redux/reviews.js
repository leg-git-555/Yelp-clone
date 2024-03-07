import { csrfFetch } from "./csrf";

//action types
const GET_REVIEWS = 'reviews/getReviews'
const DELETE_REVIEW = 'reviews/deleteReview'

//actions
const actionGetReviews = (payload) => {
    // console.log('payload', payload)
    return {
        type: GET_REVIEWS,
        payload
    }
}

export const actionDeleteReview = (payload) => {
    return {
        type: DELETE_REVIEW,
        payload
    }
}

//thunks
export const thunkGetReviews = () => async (dispatch) => {
    // console.log('inside review thunk')
    const res = await csrfFetch("/api/reviews/")
    if (res.ok) {
        const data = await res.json()
        // console.log(data)

        if (data.errors) {
            return
        }
        
        // dispatch(actionGetBusinesses(data))
        dispatch(actionGetReviews(data))

    }
}


//reducer

const initialState = {}

export function reviewsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS: {
            //normalize data
            let reviewObj = {}
            action.payload.forEach(review => reviewObj[review.id] = review)
            return reviewObj
        } case DELETE_REVIEW: {
            let newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default:
            return state
    }
}