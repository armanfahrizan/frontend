import React, {useEffect} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Flex,
  Text,
  Button,
  Box,
  InputGroup,
  Avatar,
  Image,
  Input,
  InputLeftElement,
  InputRightElement
} from "@chakra-ui/react";
import { MdLogout, MdSearch } from "react-icons/md";

import logo from "../assets/Logo.png";
import { GET_USER_DATA, DELETE_USER_DATA } from "../redux/actions/types";

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
   const onButtonLogout = () => {
    return (
      localStorage.removeItem("token"),
      dispatch({type: DELETE_USER_DATA}),
      navigate('/')
    )
  }

  const user = useSelector((state) => state.user)
  return (
    <Flex w={"100vw"} h={"10vh"} direction="row" bgColor={"gray.100"}>
      <Box w="20vw" display={"flex"} >
        <Image
          position={"static"}
          ml="20px"
          mt="2px"
          boxSize="53px"
          objectFit="cover"
          src={logo}
        />
        <Text
          position={"static"}
          ml="10px"
          fontFamily={"Dubai"}
          fontStyle="normal"
          fontWeight={500}
          fontSize="36px"
          color={"orange.400"}
        >
          Moment
        </Text>
      </Box>
      <Box 
        w="30vw" 
        display={"flex"} 
        justifyContent={"space-evenly"} 
        alignItems="center"
        fontFamily="Ubuntu"
      >
        <Button colorScheme={"facebook"} variant="link">Message</Button>
        <Button colorScheme={"facebook"} variant="link">Request</Button>
        <Button colorScheme={"facebook"} variant="link">News</Button>
      </Box>
      <Box w="25vw">
      <InputGroup
            mt="8px"
            bg={"#FFFFFF"}
            borderRadius={"6px"}
            boxSizing={"border-box"}
            cursor="pointer"
        >
            <InputLeftElement 
                pointerEvents="none"
                children={<MdSearch color={"#A0AEC0"} />}
            />
            <Input
                border={"1px solid #E2E8F0"}
                type="text"
                placeholder={"Search"}
                // ref={}   
            >
            </Input>
            <InputRightElement width='80px'>
                <Button 
                  bgColor={"blue.800"}
                  color="white"
                  colorScheme={"orange"}
                  h='35px' 
                  onClick={""}
                >
                    Search
                </Button>
            </InputRightElement>
        </InputGroup>
      </Box>
      <Box w="25vw" display={"flex"} justifyContent="flex-end" >
        <Text
          position={"static"}
          fontFamily={"cursive"}
          fontSize="90%"
          color="black"
          textAlign={"center"}
          alignSelf="center"
        >
          Hi {user.username.toUpperCase()}
        </Text>
        <Avatar alignSelf={"center"} ml="10px" position={"static"}  src={user.avatar} />
        <Button
          bgColor={"blue.800"}
          color="white"
          onClick={onButtonLogout}
          ml={"10px"}
          mr="5px"
          h="40px"
          colorScheme={"orange"}
          alignSelf={"center"}
          position={"static"}
          leftIcon={<MdLogout />}
        >
          Log Out
        </Button>
      </Box>
    </Flex>
  );
}

export default Navbar;
