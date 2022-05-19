import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Text, Button, Box, Input, Avatar, Image, IconButton, LeftIcon, Textarea} from "@chakra-ui/react";
import {MdSend, MdAdd, MdPeopleAlt} from 'react-icons/md'
import {AiFillLike, AiOutlineLike, AiFillHome} from 'react-icons/ai'

//import image
import bgPost from '../assets/bg post.jpg'
import PPA from '../assets/pict Friend A.jpg'
import PPB from '../assets/pict Friend B.jpg'
import PPC from '../assets/pict Friend C.jpg'
import PPD from '../assets/pict Friend D.jpg'
import storyPost from '../assets/story post.jpg'
import storyA from '../assets/story A.jpg'
import storyB from '../assets/story B.jpg'
import storyC from '../assets/story C.jpg'
import storyD from '../assets/story D.jpg'
import postA from '../assets/post Friend A.jpg'

// import component
import Left from '../components/leftSide'

function Home () {
    const user = useSelector((state) => state.user)
    const [like, setLike] = useState(false)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    
    // useEffect(()=> {
    //     axios.get(API_URL + '/keep/login', 
    //     { headers: {"authToken": token}})
    //     .then((resp) => {
    //         console.log(`keep login respond:`, resp.data);
    //         dispatch({type: GET_USER_DATA, payload: resp.data})
    //     })
    //     .catch((err) => {
    //         console.log(`keep login error:`, err);
    //     })

    // }, [])

    // const onChangePicture = () => {
    //     console.log("ganti profile");
    // }

    const onLike = () => {
        setLike(true)
    }
    return (
        <Flex
            w="100vw"
            h="85vh"
            fontFamily={"Ubuntu"}
        >
            <Left/>
            <Flex w="50vw" pr="2px" direction={"column"} bgColor={"orange.400"}>
                <Flex h="30vh">
                    <Box w="200px" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={storyPost} 
                            objectFit="cover" 
                            position={"static"} 
                        />
                        <IconButton 
                            position={"absolute"} 
                            m="-60px 0px 0px 45px" 
                            size="md" 
                            borderRadius={"full"} 
                            icon={<MdAdd />} 
                            src={user.profilepicture}
                            objectFit="cover" 
                        />
                        <Text 
                            fontSize={"13px"}
                            textAlign="center"
                            color="white" 
                            m="-20px 0px 0px 0px" 
                        >add new story</Text>
                    </Box>
                    <Box w="200px" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={storyA} 
                            objectFit="cover" 
                            position={"static"} 
                        />
                        <Image 
                            h="40px" 
                            w="40px" 
                            borderRadius={"full"} 
                            m="-60px 0px -5px 45px" 
                            cursor="pointer"
                            src={PPA} 
                        />
                        <Text 
                            fontSize={"13px"}
                            textAlign="center"
                            color="white" 
                            mt="5px"
                        >Dewa 58</Text>
                    </Box>
                    <Box w="200px" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={storyB} 
                            objectFit="cover" 
                            position={"static"} 
                        />
                        <Image 
                            h="40px" 
                            w="40px" 
                            borderRadius={"full"} 
                            position="static" 
                            m="-60px 0px -5px 45px" 
                            src={PPB} 
                            cursor="pointer"
                        />
                        <Text 
                            fontSize={"13px"}
                            textAlign="center"
                            color="white" 
                            mt="5px"
                        > Peter Vans</Text>
                    </Box>
                    <Box w="200px" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={storyC} 
                            objectFit="cover" 
                            position={"static"} 
                        />
                        <Image 
                            h="40px" 
                            w="40px" 
                            borderRadius={"full"} 
                            m="-60px 0px -5px 45px" 
                            cursor="pointer"
                            src={PPC} 
                        />
                        <Text 
                            fontSize={"13px"}
                            textAlign="center"
                            color="white" 
                            mt="5px"
                        >Iwan Merdu</Text>
                    </Box>
                    <Box w="200px" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={storyD} 
                            objectFit="cover" 
                            position={"static"} 
                        />
                        <Image 
                            h="40px" 
                            w="40px" 
                            borderRadius={"full"} 
                            m="-60px 0px -5px 45px" 
                            cursor="pointer"
                            src={PPD} 
                        />
                        <Text 
                            fontSize={"13px"}
                            textAlign="center"
                            color="white" 
                            mt="5px"
                        >Bent Traveller</Text>
                    </Box>
                </Flex>
                <Flex h="25vh" w="50vw" mt="3px">
                    <Box w="25vw">
                        <Image 
                            position={"Static"} 
                            h="120px" 
                            w="150px" 
                            m="5px 0px 3px 2px" 
                            src={bgPost} 
                            objectFit="cover"
                        />
                        < IconButton 
                            position={"absolute"} 
                            size="md" 
                            borderRadius={"full"} 
                            m="-50px 0px 0px 55px" 
                            icon={<MdAdd />} 
                            bgColor="whiteAlpha.600"
                        />
                    </Box>
                    <Box w="75vw">
                        <Box h="95px" pr="4px">
                            <Textarea 
                                mt="5px" 
                                placeholder="What's your moment today?" 
                                bgColor={"whiteAlpha.700"}
                            />
                        </Box>
                        <Flex h="30px" justifyContent={"space-between"} pr="4px" >
                            <Input 
                                h="95%" 
                                w="35%" 
                                pl="5px" 
                                fontSize={"sm"} 
                                bgColor={"whiteAlpha.600"} 
                                placeholder="location at ..."
                            />
                            <Input 
                                h="95%" 
                                w="35%" 
                                pl="5px" 
                                fontSize={"sm"} 
                                bgColor={"whiteAlpha.600"} 
                                placeholder="my moment with ..."
                            />
                            <Button 
                                h="95%" 
                                w="22%" 
                                mt="1px" 
                                colorScheme={"teal"} 
                                bgColor={"whiteAlpha.600"} 
                                variant="outline" 
                                leftIcon={<MdSend/>}
                            >Post</Button>
                        </Flex>
                    </Box>
                </Flex>
                <Flex h="30vh">
                    <Flex w="40vw">
                        <Image 
                            p="0px 8px 3px 3px" 
                            position={"static"} 
                            src={postA}
                        />
                    </Flex>
                    <Flex w="60vw" direction={"column"}>
                        <Flex h="30%">
                            <Image 
                                h="50px" 
                                w="50px" 
                                borderRadius={"10"} 
                                objectFit="cover" 
                                src={PPA}
                            />
                            <Text 
                                fontSize={"xl"} 
                                m="10px 5px" 
                                fontWeight={"bold"}
                            >Dewa 58</Text>
                        </Flex>
                        <Box h="50%" >
                            <Box 
                                h="95%" 
                                m="3px 0px" 
                                p="5px" 
                                border="2px solid" 
                                borderRadius={"10"} 
                                fontSize={"13px"} >Selamat ulang tahun untuk anak lu bro @brandon80, cepet gede ya biar bisa ngewar bareng. Wkwkwk</Box>
                        </Box>
                        <Flex h="20%">
                            <Box h="100%" w="30px" p="8px" cursor={"pointer"} onClick={() => onLike()} variant="ghost" >
                                {like? <AiFillLike/> : <AiOutlineLike/>}
                            </Box>
                            <Text fontSize="13px" p="8px">at Kemang</Text>
                            <Text fontSize="13px" ml="20px" p="8px">with Brandon Parker</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                w="10vw"
                direction={"column"}
                borderLeft={"2px"} 
                borderColor="blackAlpha.600"
                bgColor={"orange.400"}
            >
                <Text textAlign={"center"} color={"blue"} fontWeight="800" mb="10px">Active</Text>
                <Flex h="30px" cursor="pointer">
                    <Image h="25px" w="25px" borderRadius={20} src={PPA} m="2px 0px 0px 10px" />
                    <Text color="blue" fontSize={"sm"} m="3px 0px 0px 10px" >Dewa 58</Text>
                </Flex>
                <Flex h="30px" cursor="pointer">
                    <Image h="25px" w="25px" borderRadius={20} src={PPB} m="2px 0px 0px 10px" />
                    <Text color="blue" fontSize={"sm"} m="3px 0px 0px 10px" >Peter Vans</Text>
                </Flex>
                <Flex h="30px" cursor="pointer">
                    <Image h="25px" w="25px" borderRadius={20} src={PPC} m="2px 0px 0px 10px" />
                    <Text color="blue" fontSize={"sm"} m="3px 0px 0px 10px" >Iwan Merdu</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Home