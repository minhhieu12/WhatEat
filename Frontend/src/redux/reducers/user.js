import { USER_STATE_CHANGE } from '../constants/index'

const initialState = {
    currentUser: null
}

export const user = (state = initialState, action) => {
    return{
        ...state,
        currentUser: action.currentUser
    }
}