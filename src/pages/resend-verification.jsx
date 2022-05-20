import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Box, Text} from '@chakra-ui/react'

const API_URL = process.env.REACT_APP_API_URL
function Verification () {
    const pathname = window.location.pathname;
    const params = pathname.split('/verify/')
    console.log(`parameter:`, params);
    const token = params[1]
    const userId = params[2]
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [message, setMessage] = useState("Loading.....")
    useEffect(() => {
        dispatch({type: 'LOADING_START'})
        console.log(`token:`, token);
        axios.get(API_URL + `/auth/verify/${token}`
        ,{headers: {'UID': userId}}
        )
        .then ((resp) => {
            dispatch({type: 'LOADING_END'})
            setMessage(<b>Your account has been verified.<br/>Please wait, we will direct you to Moment Page automatically.</b>)
            console.log(`respond:`, resp);
            
            setTimeout(() => navigate('/'), 3000)
        })
        .catch((err) => {
            dispatch({type: 'LOADING_END'})
            console.log(`error:`, err);
        })
    }, [])
    

    
    return (
        <Box pl="90px" pt="50px">
            <Text fontSize={"20px"}> {message} </Text>
        </Box>
    )
}

export default Verification