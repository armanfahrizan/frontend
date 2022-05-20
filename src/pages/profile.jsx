import React, {useState, useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Flex, Box, Text, Button, Input, Textarea, Image, useToast  } from "@chakra-ui/react";

//import component
import Left from "../components/leftSide";
import Confirmation from "../components/confirmation";
import { LOADING_END, LOADING_START } from "../redux/actions/types";
const API_URL = process.env.REACT_APP_API_URL

function Profile() {
  const toast = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [saveImage, setSaveImage] = useState("")
  const [showImage, setShowImage] = useState(null)
  const [saveAva, setSaveAva] = useState("")
  const [showAva, setShowAva] = useState(null)
  const [confirm1, setConfirm1] = useState(false)
  const [confirm2, setConfirm2] = useState(false)
  const [confirm3, setConfirm3] = useState(false)
  const editFullnameRef = useRef('')
  const editUsernameRef = useRef('')
  const editBioRef = useRef('')

  const saveEditProfile = async() => {
    const body = {
      fullname: editFullnameRef.current.value,
      username: editUsernameRef.current.value,
      bio: editBioRef.current.value
    }

    console.log("body:", body);
    
    dispatch({type: LOADING_START})
    await axios.patch(API_URL+`/edit/profile/${user.userId}`, body)
    .then((resp) => {
      dispatch({type: LOADING_END})
      toast({
        title: "Success",
        description: "Edit Profile Success",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/home')
    })
    .catch((err) => {
      console.log(`Error when update profile:`, err);
      dispatch({type: LOADING_END})
      toast({
        title: "Error",
        description: err.response.data,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    })
  }


  const handleProfileChange = (e) => {
    //ambil file di js, karena hanya 1 file, maka gunakan indeks ke-0 
    const urlObject = e.target.files[0]
    //membuat filename berdasarkan alamat website yang digunakan
    const urlName = URL.createObjectURL(e.target.files[0])
    //untuk menampilkan gambar pada saat diupload
    setShowImage(urlName)
    setSaveImage(urlObject)
  }

  const onSaveImageProfile = async () => {
    //check empty data
    if(!saveImage){
      toast({
        title: "Error",
        description: "Choose file first.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    //membuat form data seperti di postman
    const formData = new FormData()
    //formData.append("KEY", "VALUE", optional:"DESCRIPTION")
    formData.append("image", saveImage)
    
    dispatch({type: LOADING_START})
    await axios.patch(API_URL + `/upload/${user.userId}`, formData)
    .then((resp) => {
      dispatch({type: LOADING_END})
      toast({
        title: "Success",
        description: "Change Profile Picture Success",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/home')
    })
    .catch((err) => {
      console.log(`Error when upload profile picture:`, err);
      dispatch({type: LOADING_END})
      toast({
        title: "Error",
        description: "Upload image failed",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  const handleAvatarChange = (e) => {
    const urlAvaName = e.target.files[0]
    setShowAva(URL.createObjectURL(urlAvaName))
    setSaveAva(urlAvaName)
  }

  const onSaveImageAva = async() => {
    if(!saveAva){
      toast({
        title: "Error",
        description: "Choose file first.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }

    const formData = new FormData()
    formData.append('image', saveAva)

    dispatch({type: LOADING_START})
    await axios.patch(API_URL + `/ava/${user.userId}`, formData)
    .then((resp) => {
      dispatch({type: LOADING_END})
      toast({
        title: "Change Avatar Success",
        description: resp.data,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/home')

    })
    .catch((err) => {
      console.log(`Error when upload avatar:`, err);
      dispatch({type: LOADING_END})
      toast({
        title: "Error",
        description: "Change Avatar failed",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  
  const onButtonConfirm1 = () => {
    setConfirm1(true)
  }
  const onCancelProfilePicture = () => {
    setConfirm1(false)
  }
  const onConfirmProfilePicture = () => {
    setConfirm1(false)
    onSaveImageProfile()
  }
  
  const onButtonConfirm2 = () => {
    setConfirm2(true)
  }
  const onCancelAvatar = () => {
    setConfirm2(false)
  }
  const onConfirmAvatar = () => {
    setConfirm2(false)
    onSaveImageAva()
  }


  const onButtonConfirm3 = () => {
    setConfirm3(true)
  }
  const onCancelEditProfile = () => {
    setConfirm3(false)
  }
  const onConfirmEditProfile = () => {
    setConfirm3(false)
    saveEditProfile()
  }
  return (
    <Flex w="100vw" h="86vh" fontFamily={"Ubuntu"}>
      <Left/>
      <Confirmation
          isOpen={confirm3}
          title="Save Profile Confirmation"
          onButtonCancel={onCancelEditProfile}
          onButtonConfirm={onConfirmEditProfile}
      />
      <Confirmation
          isOpen={confirm1}
          title="Save Picture Profile Confirmation"
          onButtonCancel={onCancelProfilePicture}
          onButtonConfirm={onConfirmProfilePicture}
      />
      <Confirmation
          isOpen={confirm2}
          title="Save Avatar Confirmation"
          onButtonCancel={onCancelAvatar}
          onButtonConfirm={onConfirmAvatar}
      />
      <Flex w="70vw" direction={"column"}>
        <Text
          fontSize={"3xl"}
          fontWeight="800"
          color={"whiteAlpha.800"}
          h="11vh"
          bgColor={"blue.900"}
          p="20px 30px"
        >
          EDIT PROFILE
        </Text>
        <Flex pt="5px" >
          <Box>
            <Box ml="10px" w="20vw">
              <Flex alignItems={"center"} justifyContent={"space-between"} w="20vw">
                <Text fontSize={"xl"} >Profile Picture</Text>
                <Button 
                  size="xs"
                  w="9vw" 
                  bgColor={"blue.900"} 
                  color="whiteAlpha.900"
                  onClick={onButtonConfirm1}
                >Save Profile Picture</Button>
              </Flex>              
              <Box 
                h="40vh" 
                w="20vw" 
                bgColor={"gray.100"}
                border="3px solid #e58e26"
              >
                <Image 
                  objectFit={"cover"}
                  src={showImage}
                    
                />
              </Box>
              <Input
                w="20vw"
                border={"2px solid"} 
                borderColor="blackAlpha.400"
                color="blue.900"
                fontSize={"10px"}
                type="file"
                size="10px"
                onChange={handleProfileChange}
              />
            </Box>
            <Text mt="25px" ml="10px" fontSize={"xl"} >Avatar</Text>
            <Flex ml="10px" pr="20px">
              <Image 
                h="13vh" 
                w="6vw" 
                mr="1%" 
                bgColor={"gray.100"} 
                border="2px solid #e58e26" 
                src={showAva}
              />
              <Flex  direction={"column"} justifyContent={"right"}>
                <Button 
                  mt="5vh"
                  ml="7vw" 
                  w="7vw" 
                  size="xs" 
                  bgColor={"blue.900"} 
                  color="whiteAlpha.900"
                  onClick={onButtonConfirm2}
                >Save my Avatar</Button>
                <Input
                  w="14vw"
                  pl="0px"
                  border={"2px solid"} 
                  borderColor="blackAlpha.400"
                  color="blue.900"
                  fontSize={"9px"}
                  onChange={handleAvatarChange}
                  type="file"
                  size="xs"
                />
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Box h="15vh" ml="15px" pr="20px">
              <Text fontSize={"xl"}>Full Name</Text>
              <Input
                border={"2px solid"} 
                borderColor="blackAlpha.400"
                placeholder={user.fullname}
                color="blue.900"
                size="md"
                w="33vw"
                fontSize={"17px"}
                ref={editFullnameRef}
              />
            </Box>
            <Box h="15vh" ml="15px" pr="20px">
              <Text fontSize={"xl"}>Username</Text>
              <Input
                border={"2px solid"} 
                borderColor="blackAlpha.400"
                placeholder={user.username}
                size="md"
                fontSize={"17px"}
                ref={editUsernameRef}
              />
            </Box>
            <Box h="27vh" ml="15px" pr="20px">
              <Text fontSize={"xl"}>Bio</Text>
              <Textarea
                border={"2px solid"} 
                borderColor="blackAlpha.400"
                placeholder={user.bio === undefined? "I'm an Engineer Technician" : user.bio}
                size="sm"
                fontSize={"16px"}
                resize={"vertical"}
                maxH="20vh"
                ref={editBioRef}
              />
            </Box>
                <Button 
                  size="xs"
                  w="10vh" 
                  bgColor={"blue.900"} 
                  color="whiteAlpha.900"
                  onClick={onButtonConfirm3}
                  ml="66vh"
                  fontSize={"15px"}
                >Save</Button>
          </Box>
        </Flex>
        <Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Profile;
