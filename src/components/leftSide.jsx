import React, {useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button, Box, Image, Textarea} from "@chakra-ui/react";


//import image
import profileUser1 from '../assets/profile-1.jpg'
import homeLogo from '../assets/Home logo.png'
import profileLogo from '../assets/Profile Logo.png'
import albumLogo from '../assets/Album Logo.png'
import friendsLogo from '../assets/Friends Logo.png'
import newsLogo from '../assets/News Logo.png'


function Left() {
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    // const [profile, setProfile] = useState(null)
    
    // const baseUrlImage = ``

    const onChangePicture = () => {
        console.log("ganti profile");
    }

    const onHomeButton = () => {
        navigate('/home')
    }

    const onProfileButton = () => {
        navigate('/profile')
    }
    
    const onAlbumButton = () => {
        navigate('/post')
    }

    return (
        <Flex 
            w="40vw"
            direction={"column"} 
            borderTop={"2px"} 
            borderColor="blackAlpha.600" 
            bgColor={"gray.100"}
        >
            <Flex h="45vh">
                <Image 
                    p="5px" 
                    w="40vw" 
                    src={user.profilepicture} 
                    cursor="pointer" 
                    onClick={onChangePicture} 
                />
                <Flex w="60vw" direction={"column"}>
                    <Box h="30vh" >
                        <Text 
                            fontSize={"2xl"} 
                            p="10px 0px 0px 12px"
                        > {user.fullname}</Text>
                    </Box>
                    <Box 
                        h="10vh" 
                        borderBottom={"1px solid"} 
                        borderBottomColor="blackAlpha.200"
                    >
                        <Text pl="12px"> {user.email} </Text>
                    </Box>
                    <Box h="50vh" pl="12px" pr="8px" > Bio:  
                        <Box h="90%" borderRadius="10"> {user.bio}</Box>
                    </Box>
                </Flex>
            </Flex>
            <Box 
                m="10px 60px" 
                h="70vh" 
                direction={"column"} 
                border={"2px solid #2c3e50"} 
                borderBottom={"0px solid #2c3e50"} 
                borderRadius="10" 
            >
                <Flex h="25%" mb="-10px">
                    <Button 
                        color="black" 
                        colorScheme={"twitter"} 
                        size={"md"} 
                        w="60vw" 
                        variant={"ghost"} 
                        borderBottom={"3px solid black"} 
                        justifyContent={"center"}
                        onClick={onHomeButton}
                    >
                        <Image 
                            mr="20px" 
                            h="30px" 
                            w="30px" 
                            src={homeLogo} />
                    HOME
                    </Button>
                </Flex>
                <Flex h="25%" mb="-9px">
                    <Button 
                        color="black" 
                        colorScheme={"twitter"} 
                        w="60vw" 
                        variant={"ghost"} 
                        borderBottom={"3px solid black"} 
                        justifyContent={"center"}
                        onClick={onProfileButton}
                    >
                        <Image 
                            mr="15px" 
                            h="35px" 
                            w="35px" 
                            src={profileLogo} 
                        />
                    PROFILE
                    </Button>                    
                </Flex>
                <Flex h="25%" mb="-10px">
                    <Button 
                        color="black" 
                        colorScheme={"twitter"} 
                        w="60vw" 
                        variant={"ghost"} 
                        borderBottom={"3px solid black"} 
                        justifyContent={"center"}
                        onClick={onAlbumButton}
                    >
                        <Image 
                            mr="10px" 
                            h="25px" 
                            w="25px" 
                            src={albumLogo} 
                        />
                    ALBUM
                    </Button>                    
                </Flex>
                <Flex h="25%" mb="-10px">
                    <Button 
                        color="black" 
                        colorScheme={"twitter"} 
                        w="60vw" 
                        variant={"ghost"} 
                        borderBottom={"3px solid black"} 
                        justifyContent={"center"}
                        // onClick={onFriendButton}
                    >
                        <Image 
                            mr="10px" 
                            h="25px" 
                            w="25px" 
                            src={friendsLogo} 
                        />
                    FRIENDS
                    </Button>                    
                </Flex>
                <Flex h="25%" mb="-7px">
                    <Button 
                        color="black" 
                        colorScheme={"twitter"} 
                        w="60vw" 
                        variant={"ghost"} 
                        borderBottom={"3px solid black"} 
                        justifyContent={"center"}
                        // onClick={onNewsButton}
                    >
                        <Image 
                            mr="10px" 
                            h="30px" 
                            w="30px" 
                            src={newsLogo} 
                        />
                    NEWS
                    </Button>                    
                </Flex>
            </Box>
        </Flex>
    )
}

export default Left