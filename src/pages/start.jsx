import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Input,
  FormLabel,
  FormHelperText,
  FormControl,
  Slide,
  CloseButton,
  InputGroup,
  useToast
} from "@chakra-ui/react";

//import redux
import { LOADING_END, LOADING_START } from "../redux/actions/types";
import {addNewUser, loginUser} from '../redux/actions/user-actions'

//import components
import Registration from "../components/register";
import Reset from "../components/forgot-password";

//import image
import logo from "../assets/Logo.png";
const API_URL = process.env.REACT_APP_API_URL

function Start() {
  const [createOpen, setCreateOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [show, setShow] = useState(false)
  const showLoginPassword = () => setShow(!show)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  
  const loginUsername = useRef('')
  const loginPassword = useRef('')

  const onLoginButton = async () => {
    const bodyOnLogin = {
      username: loginUsername.current.value,
      password: loginPassword.current.value
    }
    
    dispatch({type: LOADING_START})
    await axios.post(API_URL + '/user', bodyOnLogin)
    .then((resp) => {
      const token = resp.headers["authtoken"].split(" ")[1]
      localStorage.setItem("token", token)

      dispatch({type: LOADING_END})
      toast({
        title: "Login Success",
        description: "Login Success",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      navigate('/home')
    })
    .catch ((err) => {
      dispatch({type: LOADING_END})
      console.log(`error login:`, err);
      if(err){
        return toast({
          title: `Error`,
          description: err.response.data, 
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    })
  }

  //proteksi jika sudah login
  const token = localStorage.getItem('token')
  if (token){
    return <Navigate to='/home' />
  }

  const regCloseButton = () => {
    setCreateOpen(false);
  };

  const onCreateOpen = () => {
      setCreateOpen(true);
  };
  
  const onForgotOpen = () => {
    setForgotOpen(true);
  };
  const forgotCloseButton = () => {
    setForgotOpen(false);
  };
  return (
    <Flex w="100vw" h="100vh" direction={"row-reverse"}>
      <Box w="45vw" bgColor={"#fcfafa"} borderLeft="3px solid #a6a6a6">
        <Box h="50vh" pt="18%" pl="32%">
          <Image h="200px" w="200px" position={"static"} src={logo} />
        </Box>
        <Box h="20vh">
          <Text
            textAlign={"center"}
            fontSize="90px"
            fontFamily={"Dubai"}
            color={"orange.400"}
          >
            MOMENT
          </Text>
        </Box>
        <Box h="30vh" p="20px 80px 80px 80px">
          <Text
            fontFamily={"ubuntu"}
            fontSize="20px"
            fontWeight={"800"}
            textAlign="center"
          >
            Live your alive moment
          </Text>
        </Box>
      </Box>
      <Box w="55vw" bgColor={"#f1f2f6"} borderLeft="5px solid #0c2461">
        <Box
          border={"4px solid #1e3799"}
          borderRadius="10"
          h="80vh"
          w="80%"
          position={"static"}
          m="70px"
        >
          <Text
            textAlign={"center"}
            m="5% 5% 0% 4%"
            borderBottom={"1px solid black"}
            w="40vw"
            fontFamily={"Ubuntu"}
            fontSize="30px"
            fontWeight={"extrabold"}
          >
            LOGIN
          </Text>
          <FormControl>
            <FormLabel m="20px 0px 0px 30px">Username or Email</FormLabel>
            <Input
              placeholder="Input your Username or Email here"
              m="5px 0px 0px 30px"
              w="32vw"
              type="text"
              border={"2px solid"}
              borderColor="blue.700"
              ref={loginUsername}
            />
            <FormHelperText fontSize={"13px"} color={"blackAlpha.700"} m="1px 0px 0px 30px">
              *Use alphanumeric without any symbol.
            </FormHelperText>
            <FormLabel m="20px 0px 0px 30px">Password</FormLabel>
            <InputGroup size="md">
                <Input
                    placeholder="Input your Password here"
                    m="5px 0px 0px 30px"
                    pr="30px"
                    w="32vw"
                    type={show? "text" : "password"}
                    border={"2px solid"}
                    borderColor="blue.700"
                    ref={loginPassword}
                />
            </InputGroup>
            <Flex justifyContent={"space-between"} ml="30px" mb="15px" w="32vw">
            <FormHelperText fontSize={"13px"} color={"blackAlpha.700"} mt="0px">
              *Password must contain alphanumeric and symbol.
            </FormHelperText>
                  <Button onClick={showLoginPassword} variant="link" fontSize={"13px"} colorScheme={"orange"}>
                      {show ? "Hide Password" : "Show Password"}
                  </Button>
            </Flex>        
          </FormControl>
          <Text textAlign={"center"}>
            <Button
              onClick={onLoginButton}
              variant={"outline"}
              colorScheme="blue"
              border="2px"
              disabled=""
            >
              Log In
            </Button>
          </Text>
          <Text textAlign={"center"} borderBottom={"1px solid black"}>
            <Flex justifyContent={"center"}>
            <Button
              m="5px 0px"
              onClick={onForgotOpen}
              variant={"link"}
              colorScheme="orange"
            >
              Forgot your password?
            </Button>
            <Text fontWeight="bold" textAlign={"center"} alignSelf="center" m="0px 15px">Or</Text>
            <Button
              m="5px 0px"
              onClick={""}
              variant={"link"}
              colorScheme="orange"
            >
              Not verified account?
            </Button>
            </Flex>
          </Text>
          <Text textAlign={"center"} mt="10px">
            don't have an account?
            <Button
              ml="8px"
              onClick={onCreateOpen}
              variant={"link"}
              colorScheme="messenger"
              size="sm"
            >
              Create an account.
            </Button>
          </Text>
        </Box>
      </Box>
      <Slide
        direction="bottom"
        in={createOpen}
      >
        <Registration onCreateClose={() => regCloseButton()} />
      </Slide>
      <Slide
        direction="left"
        in={forgotOpen}
      >
        <Reset onButtonClose={() => forgotCloseButton()}/>
      </Slide>
    </Flex>
  );
}

export default Start;
