import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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
import {addNewUser, loginUser} from '../redux/actions/user-actions'
import { LOADING_END, LOADING_START } from "../redux/actions/types";

//import image
const API_URL = process.env.REACT_APP_API_URL


function Registration ({onCreateClose}) {
    const [see, setSee] = useState(false)
    const showRegisterPassword = () => setSee(!see)
    const dispatch = useDispatch()
    const toast = useToast()

    const regFullname = useRef('')
    const regUsername = useRef('')
    const regEmail = useRef('')
    const regPassword = useRef('')
    const regRepassword = useRef('')

    const onRegisterButton = async () => {
        const bodyOnReg = {
          fullname: regFullname.current.value,
          username: regUsername.current.value,
          email: regEmail.current.value,
          password: regPassword.current.value,
          repassword: regRepassword.current.value
        }
        console.log(`body on register:`, bodyOnReg);
    
        dispatch({type: LOADING_START})
        await axios.post(API_URL + '/user/register', bodyOnReg)
        .then((resp) => {
          console.log(`respond on register:`, resp);
          dispatch({type: LOADING_END})
          // regFullname.current.value = ""
          regUsername.current.value = ""
          // regEmail.current.value = ""
          // regPassword.current.value = ""
          // regRepassword.current.value = ""
          
          onCreateClose()
          toast({
            title: "Registration Success",
            description: resp.data,
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        })
        .catch((err) => {
          console.log(`error on register:`, err);
          dispatch({type: LOADING_END})
          return toast({
            title: `Error`,
            description: err.response.data, 
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
    }  

    return (
        <Box
          p="2%"
          color="white"
          rounded="xl"
          shadow="dark-lg"
          bgColor={"#182C61"}
          w="100vw"
          position={"static"}
        >
          <Flex justifyContent={"flex-end"}>
            <CloseButton bgColor={"orange.400"} onClick={onCreateClose} color="blue.900" />
          </Flex>
          <Flex justifyContent={"left"}>
            <Box pr="5%">
                <FormControl>
                    <FormLabel m="5px 0px 0px 30px">Full Name</FormLabel>
                        <Input
                            placeholder="Input Full Name here"
                            m="2px 0px 0px 30px"
                            w="40vw"
                            type="text"
                            border={"2px solid"}
                            borderColor="whiteAlpha.600"
                            ref={regFullname}
                        />
                    <FormHelperText color={"whiteAlpha.600"} m="1px 0px 0px 30px">
                        *We recomend you to use your real name.
                    </FormHelperText>
                    <FormLabel m="10px 0px 0px 30px">Username</FormLabel>
                        <Input
                            placeholder="Input Username here"
                            m="2px 0px 0px 30px"
                            w="35vw"
                            type="text"
                            border={"2px solid"}
                            borderColor="whiteAlpha.600"
                            ref={regUsername}
                        />
                    <FormHelperText color={"whiteAlpha.600"} m="1px 0px 0px 30px">
                        *Use alphanumeric.
                    </FormHelperText>
                    <FormLabel m="10px 0px 0px 30px">Email</FormLabel>
                        <Input
                            placeholder="Input your Email here"
                            m="2px 0px 0px 30px"
                            w="35vw"
                            type="email"
                            border={"2px solid"}
                            borderColor="whiteAlpha.600"
                            ref={regEmail}
                        />
                    <FormHelperText color={"whiteAlpha.600"} m="1px 0px 0px 30px">
                        *Input your active email.
                    </FormHelperText>
                </FormControl>
            </Box>
            <Box borderLeft="2px solid" borderColor={"orange.400"} pl="50px">
                <FormControl>
                    <FormLabel m="25px 0px 0px 30px">Password</FormLabel>
                        <Input
                            placeholder="Input Password here"
                            m="2px 0px 0px 30px"
                            w="32vw"
                            type={see? "password" : "text"}
                            border={"2px solid"}
                            borderColor="whiteAlpha.600"
                            ref={regPassword}
                        />
                    <FormHelperText color={"whiteAlpha.600"} m="1px 0px 0px 30px">
                        *Password must contain alphanumeric and symbol.
                    </FormHelperText>
                    <FormLabel m="20px 0px 0px 30px">Password Confirmation</FormLabel>
                        <Input
                            placeholder="Input Password Confirmation here"
                            m="2px 0px 0px 30px"
                            w="32vw"
                            type={see? "password" : "text"}
                            border={"2px solid"}
                            borderColor="whiteAlpha.600"
                            ref={regRepassword}
                        />
                    <FormHelperText color={"whiteAlpha.600"} m="1px 0px 0px 30px">
                        *Password Confirmation have to equal to Password.
                    </FormHelperText>
                </FormControl>
                <Button 
                  onClick={showRegisterPassword} 
                  size="sm" 
                  variant='link'
                  color={"whiteAlpha.800"}
                  ml="27vw"
                  >
                    {see ? "Show Password" : "Hide Password"}
                </Button>
                <Text textAlign={"center"}>
                <Button
                    mt="20px"
                    onClick={onRegisterButton}
                    variant={"outline"}
                    bgColor="orange.400"
                    border="2px"
                    color="blue.900"
                    >
                    Register
                </Button>
                </Text>
            </Box>
          </Flex>
        </Box>
    )

}

export default Registration