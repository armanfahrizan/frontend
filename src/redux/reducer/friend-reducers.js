import {GET_FRIENDS, DELETE_FRIENDS} from '../actions/types'

const INITIAL_STATE = {
    data : [],
    count : 0
}

function friendReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_FRIENDS :
            return {data : action.payload.data, count : action.payload.count}
        case DELETE_FRIENDS :
            return INITIAL_STATE
        default :
            return state
    }
}
export default friendReducer