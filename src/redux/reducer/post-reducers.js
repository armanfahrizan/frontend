import {GET_POSTS, DELETE_POSTS} from '../actions/types'

const INITIAL_STATE = {
    data : [],
    count : 0
}

function postReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_POSTS :
            return {data : action.payload.data, count : action.payload.count}
        case DELETE_POSTS :
            return INITIAL_STATE
        default :
        return state
    }
}
export default postReducer