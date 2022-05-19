import {GET_USER_DATA, DELETE_USER_DATA} from '../actions/types'

const INITIAL_STATE = {
    userId: "",
    fullname: "",
    username: "",
    email: "",
    profilepicture: "",
    avatar: "",
    bio: ""
}

function userReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USER_DATA :
            return {...state,
                userId: action.payload.userId,
                fullname: action.payload.fullname,
                username: action.payload.username,
                email: action.payload.email,
                profilepicture: action.payload.profilepicture,
                avatar: action.payload.avatar,
                bio: action.payload.bio
            }
        case DELETE_USER_DATA :
            return INITIAL_STATE
        default :
            return state
    }
}
export default userReducer