import {GET_POSTS, DELETE_POSTS} from '../actions/types'

const INITIAL_STATE = {
    data: {
        image: "",
        caption: "",
        location: "",
        friend: ""
    }

}

function postReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_POSTS :
            return {...state, 
                image : action.payload.data[action.payload.total_data - 1].image,
                caption: action.payload.data[action.payload.total_data - 1].caption,
                location: action.payload.data[action.payload.total_data - 1].location,
                friend: action.payload.data[action.payload.total_data - 1].friend
            }
        case DELETE_POSTS :
            return INITIAL_STATE
        default :
        return state
    }
}
export default postReducer