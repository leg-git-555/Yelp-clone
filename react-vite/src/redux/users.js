import { csrfFetch } from "./csrf";

//action types
const GET_USERS = 'users/getUsers'

//actions
const actionGetUsers = (payload) => {
    return {
        type: GET_USERS,
        payload
    }
}

//thunks
export const thunkGetUsers = () => async (dispatch) => {

    const res = await csrfFetch("/api/users/")
    if (res.ok) {
        const data = await res.json()
        if (data.errors) {
            return
        }

        dispatch(actionGetUsers(data))
    }
}

//reducer

const initialState = {}

export function usersReducer (state = initialState, action) {
    switch (action.type) {
        case GET_USERS: {
            return {...state, ...action.payload}
        }
        default:
            return state
    }
}