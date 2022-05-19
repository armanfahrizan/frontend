import axios from 'axios'
import {LOADING_START, LOADING_END} from './types'

const API_URL = process.env.REACT_APP_API_URL

//create dispatch addNewUser
export const addNewUser = (body) => {
    return async (dispatch) => {
        try {
            //1. loading on
            dispatch({type: LOADING_START})
            //2. do ajax request
            await axios.post(API_URL + '/user/register', body)
            //3. loading off
            dispatch({type: LOADING_END})

            return [true, '']
        } catch (err) {
            console.log(`error:`, err.response.data);
            dispatch({type: LOADING_END})
            return [false, err.response.data]
        }
        //penambahan array yang isinya [true, ""] jika success, dan [false, error.response.data] jika error, 
        // adalah untuk mendapatkan message detail dari error, karena jika tidak yang dikrimkan hanya statusnya saja
    }
}

//create dispatch login user
export const loginUser = (body) => {
    return async (dispatch) => {
        try {
            //1. loading on
            dispatch({type: LOADING_START})
            //2. do ajax request
            await axios.post(API_URL + '/user', body)
            //3. loading off
            dispatch({type: LOADING_END})
            return [true, '']
            
        } catch (err) {
            console.log(`error:`, err.response.data);
            dispatch({type: LOADING_END})
            return [false, err.response.data]
        }
    }
}

