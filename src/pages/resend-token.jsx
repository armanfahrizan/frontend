import React from "react";
import axios from "axios";
import {useEffect} from "react";
import {Box, Text} from '@chakra-ui/react'

const API_URL = process.env.REACT_APP_API_URL
function ResendToken () {
    const pathname = window.location.pathname;
    const token = pathname.split('/verify/')[1]

    useEffect(() => {
        axios.post(API_URL + `/resend/:${token}`)
        .then ((resp) => {
            console.log(`respond:`, resp);
        })
        .catch((err) => {
            console.log(`error:`, err);
        })
    }, [])
    
    return (
        <Box pl="90px" pt="50px">
            <Text fontSize={"20px"} fontWeight="bold" color="blue.500"> We have sent you new verification account link.<br/>Please check your email.</Text>
        </Box>
    )
}

export default ResendToken