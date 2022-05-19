import React, {useState, useRef} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Flex, Box, Text, Button, Input, Textarea, Image, useToast  } from "@chakra-ui/react";

import profile1 from '../assets/profile-1.jpg'

//import component
import Left from "../components/leftSide";
import { LOADING_END, LOADING_START } from "../redux/actions/types";
const API_URL = process.env.REACT_APP_API_URL

function Profile() {
  const toast = useToast()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [value, setValue] = useState("");
  const [saveImage, setSaveImage] = useState("")
  const [showImage, setShowImage] = useState(null)
  const [saveAva, setSaveAva] = useState(null)
  const [showAva, setShowAva] =useState(null)
  const editFullnameRef = useRef('')
  const editUsernameRef = useRef('')
  const editBioRef = useRef('')


  const saveEditProfile = async() => {
    const body = {
      fullname: editFullnameRef.current.value,
      username: editUsernameRef.current.value,
      bio: editBioRef.current.value
    }
    console.log(`body:`, body);
    
    dispatch({type: LOADING_START})
    await axios.patch(API_URL+`/edit/profile/${user.userId}`, body)
    .then((resp) => {
      console.log(`respond at upload image:`, resp);
      dispatch({type: LOADING_END})
      toast({
        title: "Edit Profile Success",
        description: resp.data,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    })
    .catch((err) => {
      console.log(`check error at upload file:`, err);
      dispatch({type: LOADING_END})
      toast({
        title: "Error",
        description: "Edit Profile failed",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    })

  }


  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  }
  console.log(`value:`, value);

  const handleProfileChange = (e) => {
    //ambil file di js, karena hanya 1 file, maka gunakan indeks ke-0 
    const urlObject = e.target.files[0]
    console.log(`nama file:`,urlObject)
    //membuat filename berdasarkan alamat website yang digunakan
    const urlName = URL.createObjectURL(e.target.files[0])
    console.log(`url file name:`, urlName);
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
    await axios.post(API_URL + `/upload/ava/${user.userId}`, formData)
    .then((resp) => {
      console.log(`respond at upload image:`, resp);
      dispatch({type: LOADING_END})
      toast({
        title: "Change Profile Picture Success",
        description: resp.data,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    })
    .catch((err) => {
      console.log(`check error at upload file:`, err);
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

      const formData = new FormData()
      formData.append('image', saveAva)
      console.log(formData);
      dispatch({type: LOADING_START})
      await axios.post(API_URL + `/upload/${user.userId}`, formData)
      .then((resp) => {
        console.log(`respond at upload image:`, resp);
        dispatch({type: LOADING_END})
        toast({
          title: "Change Avatar Success",
          description: resp.data,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((err) => {
        console.log(`check error at upload file:`, err);
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
  }



  return (
    <Flex w="100vw" h="85vh" fontFamily={"Ubuntu"}>
      <Left />
      <Flex w="60vw" direction={"column"}>
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
        <Flex mt="5px">
          <Box>
            <Box ml="10px" w="20vw">
              <Flex alignItems={"center"} justifyContent={"space-between"} w="20vw">
                <Text fontSize={"xl"} >Profile Picture</Text>
                <Button 
                  size="xs"
                  w="15vw" 
                  bgColor={"blue.900"} 
                  color="whiteAlpha.900"
                  onClick={onSaveImageProfile}
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
            <Text ml="10px" fontSize={"xl"} >Avatar</Text>
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
                  ml="4vw" 
                  w="10vw" 
                  size="xs" 
                  bgColor={"blue.900"} 
                  color="whiteAlpha.900"
                  onClick={onSaveImageAva}
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
            <Box h="33vh" ml="15px" pr="20px">
              <Text fontSize={"xl"}>Bio</Text>
              <Textarea
                border={"2px solid"} 
                borderColor="blackAlpha.400"
                value={value}
                onChange={handleInputChange}
                placeholder={user.bio === undefined? "I'm an Engineer Technician" : user.bio}
                size="sm"
                fontSize={"16px"}
                resize={"vertical"}
                maxH="27vh"
                ref={editBioRef}
              />
            </Box>
                <Button 
                  size="xs"
                  w="10vh" 
                  bgColor={"blue.900"} 
                  color="whiteAlpha.900"
                  onClick={saveEditProfile}
                  ml="62vh"
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
