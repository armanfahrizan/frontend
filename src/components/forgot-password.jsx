import React, { useRef } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import {
  Flex,
  Box,
  Text,
  Button,
  Input,
  FormLabel,
  FormHelperText,
  FormControl,
  CloseButton,
  useToast
} from "@chakra-ui/react";

//import actions
import { LOADING_END, LOADING_START } from "../redux/actions/types";

//import image
const API_URL = process.env.REACT_APP_API_URL

function Reset ({onButtonClose}) {
  const dispatch = useDispatch()
  const toast = useToast()
  const forgotPassword = useRef('')

    const onForgotButton = async() => {
      const bodyOnReset = {
        email: forgotPassword.current.value
      }
      console.log(`body:`, bodyOnReset);

      dispatch({type: LOADING_START})
      await axios.post(API_URL + '/reset', bodyOnReset)
      .then((resp) => {
        dispatch({type: LOADING_END})
        console.log(`respond after req:`, resp);
        toast({
          title: "Request Success",
          description: resp.data,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        onButtonClose()
        
      })
      .catch ((err) => {
        dispatch({type: LOADING_END})
        console.log(`error after req:`, err);
        if(err){
          return toast({
            title: `Error`,
            description: err.response.data, 
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
    }
    return (
        <Box
          p="40px"
          w="40vw"
          h="70vh"
          color="blue.800"
          rounded="xl"
          shadow="dark-lg"
          bgColor={"#f5f6fa"}
        >
          <Flex justifyContent={"flex-end"}>
            <CloseButton 
              color="blue.900" 
              bgColor={"orange.400"} 
              border="2px solid" 
              borderColor={"blue.900"} 
              onClick={onButtonClose} 
            />
          </Flex>
          <Flex>
            <Box borderLeft="2px solid" borderColor={"orange.400"}>
                <FormControl>
                    <FormLabel 
                      color="blue.900" 
                      m="25px 0px 0px 30px"
                    >We will send you email to reset your password.
                    </FormLabel>
                    <FormLabel color="blue.900" m="25px 0px 0px 30px">Email</FormLabel>
                        <Input
                            placeholder="Input your email here"
                            m="2px 0px 0px 30px"
                            w="90%"
                            type="email"
                            border={"2px solid"}
                            borderColor="blackAlpha.700"
                            ref={forgotPassword}
                        />
                    <FormHelperText color="blue.900" m="1px 0px 0px 30px">
                        *Input your active email.
                    </FormHelperText>
                </FormControl>
                <Text textAlign={"center"}>
                <Button
                    mt="20px"
                    onClick={onForgotButton}
                    variant={"outline"}
                    bgColor="orange.400"
                    border="2px"
                    borderColor={"blue.900"}
                    color="blue.900"
                    >
                    Send
                </Button>
                </Text>
            </Box>
          </Flex>
        </Box>
    )
}

export default Reset