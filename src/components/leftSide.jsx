import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Flex, Text, Button, Box, Image} from "@chakra-ui/react";


//import image
import profileUser1 from '../assets/profile-default.jpg'
import homeLogo from '../assets/Home logo.png'
import profileLogo from '../assets/Profile Logo.png'
import albumLogo from '../assets/Album Logo.png'
import friendsLogo from '../assets/Friends Logo.png'
import newsLogo from '../assets/News Logo.png'


function Left() {
    const navigate = useNavigate()
    
    const user = useSelector((state) => state.user)
    const profilepicture = user.profilepicture
    const fullname = user.fullname 
    const email = user.email 
    const bio = user.bio 
  

    const onChangePicture = () => {
        navigate('/profile')
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
            w="30vw"
            direction={"column"} 
            borderTop={"2px"} 
            borderColor="blackAlpha.600" 
            bgColor={"orange.300"}
        >
            <Flex h="40vh">
                <Image 
                    p="5px"
                    h="35vh" 
                    w="45%"
                    src={profilepicture? profilepicture : profileUser1} 
                    cursor="pointer" 
                    onClick={onChangePicture}
                    opacity={profilepicture? "100%" : "40%"}
                />
                <Flex w="55%" direction={"column"}>
                    <Box h="25vh" >
                        <Text 
                            fontSize={"2xl"} 
                            p="5px 0px 0px 5px"
                        > {fullname}</Text>
                    </Box>
                    <Box 
                        h="5vh" 
                        borderBottom={"1px solid"} 
                        borderBottomColor="blackAlpha.200"
                        pt="9px"
                    >
                        <Text pl="5px" fontSize={"13px"}>{email} </Text>
                    </Box>
                    <Box h="180px" pl="5px" pr="8px" fontSize={"xl"} > Bio:  
                        <Text 
                            h="140px" 
                            fontSize={"12px"} 
                        >{bio}</Text>
                    </Box>
                </Flex>
            </Flex>
            <Box 
                m="28px 60px" 
                h="60%" 
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
                <Flex h="25%" mb="-10px">
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