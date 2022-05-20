import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Text, Button, Box, Input, useToast, Image, IconButton, Textarea, Fade, CloseButton} from "@chakra-ui/react";
import {MdSend, MdAdd} from 'react-icons/md'
import {AiFillLike, AiOutlineLike} from 'react-icons/ai'

//import image
import profileUser1 from '../assets/profile-default.jpg'
import PPA from '../assets/pict Friend A.jpg'
import PPB from '../assets/pict Friend B.jpg'
import PPC from '../assets/pict Friend C.jpg'
import PPD from '../assets/pict Friend D.jpg'
import PPE from '../assets/pict Friend E.jpg'
import storyPost from '../assets/story post.jpg'
import storyA from '../assets/story A.jpg'
import storyB from '../assets/story B.jpg'
import storyC from '../assets/story C.jpg'
import storyD from '../assets/story D.jpg'
import storyE from '../assets/story E.jpg'
import bgPost from '../assets/bg post.jpg'


// import component
import Left from '../components/leftSide'
import { LOADING_START, LOADING_END, GET_POSTS } from "../redux/actions/types";
import Confirmation from "../components/confirmation";

const API_URL = process.env.REACT_APP_API_URL


function Home () {
    const user = useSelector((state) => state.user)
    const posts = useSelector((state) => state.posts)
    const [like, setLike] = useState(false)
    const [like2, setLike2] = useState(false)
    const [saveImage, setSaveImage] = useState("")
    const [showImage, setShowImage] = useState(bgPost)
    const [posting, setPosting] = useState(false)
    const [confirm, setConfirm] = useState(false)  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toast = useToast()
    const captionRef = useRef('')
    const locationRef = useRef('')
    const friendRef = useRef('')
    
    useEffect(() => {
        dispatch({type: LOADING_START})
        axios.get(API_URL + `/caption/${localStorage.getItem("userId")}`)
        .then((resp) => {
            dispatch({type: GET_POSTS, payload: resp.data})
            dispatch({type: LOADING_END})
        })
        .catch((err) => {
            console.log(`error when get all posts:`, err);
            dispatch({type: LOADING_END})
        })
    }, [])
    
    console.log(`user di home:`, user);
    console.log(`post di home:`, posts);
    
    const body = {
        caption: captionRef.current.value,
        location: locationRef.current.value,
        friend: friendRef.current.value
    }

    const handlePostChange = (e) => {
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

    const onPost = async () => {
        dispatch({type: LOADING_START})
        //check file image if empty
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
        formData.append('caption', body.caption)
        formData.append('location', body.location)
        formData.append('friend', body.friend)

        console.log(`isi formData:`, formData);
        
        dispatch({type: LOADING_START})
        await axios.post(API_URL + `/caption/${user.userId}`, formData)
        .then((resp) => {
            console.log(`respond at psting:`, resp);
            dispatch({type: LOADING_END})
            captionRef.current.value = ""
            locationRef.current.value = ""
            friendRef.current.value = ""
            setSaveImage(bgPost)
            toast({
                title: "Success",
                description: "Post Success",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
        .catch((err) => {
            console.log(`check error at upload file:`, err);
            dispatch({type: LOADING_END})
            toast({
            title: "Error",
            description: "Post failed",
            status: 'error',
            duration: 3000,
            isClosable: true,
            })
        })
        navigate('/home')
    }               

    const onLike = () => setLike(!like)
    const onLike2 = () => setLike2(!like2)
    const onPostOpen = () => {
        setPosting(true);
    };
    const onPostClose = () => {
        setPosting(false)
        setSaveImage(bgPost)
    };
    const onPostConfirm = () => {
        setConfirm(true)
    }
    const onCancelPost = () => {
        setConfirm(false)
    }
    const onConfirmPost = () => {
        setConfirm(false)
        onPost()
    }
      
    return (
        <Flex
            w="100vw"
            h="86vh"
            fontFamily={"Ubuntu"}
        >
            <Left />
            <Confirmation
                isOpen={confirm}
                title="Post Confirmation"
                onButtonCancel={onCancelPost}
                onButtonConfirm={onConfirmPost}
            />
            <Flex 
                w="60vw" 
                pr="2px" 
                direction={"column"} 
                bgColor={"orange.300"}
                borderTop={"2px"} 
                borderColor="blackAlpha.600"    
            >
                <Flex h="31vh" mt="8px">
                    <Box w="15vw" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={bgPost} 
                            objectFit="fill"
                            position={"static"} 
                        />
                        <IconButton 
                            position={"relative"} 
                            m="-18vh 0vw 0vh 3vw"
                            size="md" 
                            borderRadius={"full"} 
                            icon={<MdAdd />} 
                        />
                        <Text 
                            fontSize={"13px"}
                            textAlign="center"
                            color="white" 
                            m="-8vh 0px 0px 0px" 
                        >add new story</Text>
                    </Box>
                    <Box w="200px" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={storyA} 
                            objectFit="fill" 
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
                        >Heri Nigua Yer</Text>
                    </Box>
                    <Box w="200px" p="1px">
                        <Image 
                            h="160px" 
                            m="2px 0px 0px 1px" 
                            src={storyE} 
                            objectFit="cover" 
                            position={"static"} 
                        />
                        <Image 
                            h="40px" 
                            w="40px" 
                            borderRadius={"full"} 
                            m="-60px 0px -5px 45px" 
                            cursor="pointer"
                            src={PPE} 
                        />
                        <Text 
                            fontSize={"13px"}
                            textAlign="center"
                            color="white" 
                            mt="5px"
                        >Luhur Bisnar</Text>
                    </Box>
                </Flex>
                <Flex h="53vh" mt="25px">
                    <Box w="25%" pr="2px">
                        <Image 
                            position={"Static"} 
                            h="40vh" 
                            w="30vw" 
                            m="5px 0px 0px 2px" 
                            src={showImage} 
                            objectFit="fill"
                        />
                        < IconButton 
                            position={"absolute"} 
                            size="md" 
                            borderRadius={"full"} 
                            m="-50px 0px 0px 72px" 
                            icon={<MdAdd />} 
                            bgColor="whiteAlpha.600"
                            onClick={onPostOpen}
                            cursor="pointer"
                        />
                        <Fade
                            direction="left"
                            in={posting}
                        >
                            <Flex 
                                h="4vh" 
                                w="15vw" 
                                position={"relative"} 
                            >
                                <Input 
                                    type="file"
                                    size="md" 
                                    fontSize={"13px"} 
                                    h="30px" 
                                    w="250px" 
                                    pl="1px"
                                    pt="1px" 
                                    onChange={handlePostChange}
                                    disabled={!posting}
                                />
                                <CloseButton 
                                    color="blue.900"
                                    size="md"
                                    bgColor={"white.900"} 
                                    border="2px solid" 
                                    borderColor={"blue.900"} 
                                    onClick={onPostClose} 
                                />
                            </Flex>
                        </Fade>
                    </Box>
                    <Box 
                        w="30%"
                        p="5px 5px 0px 2px"
                        borderRight={"2px solid #34495e"}
                        >
                        <Flex>
                            <Image 
                                h="70px" 
                                w="70px" 
                                borderRadius={"10"} 
                                objectFit="cover" 
                                src={user.profilepicture? user.profilepicture : profileUser1}
                            />
                            <Text 
                                fontSize={"xl"} 
                                m="20px 5px" 
                                fontWeight={"bold"}
                            >{user.username}</Text>
                        </Flex>
                        <Textarea 
                            mt="5px" 
                            maxH="120px"
                            fontSize={"15px"}
                            boxSizing="border-box"
                            textColor={"blackAlpha.800"}
                            placeholder="What's your moment today?" 
                            bgColor={"whiteAlpha.700"}
                            ref={captionRef}
                        />
                        <Flex h="5vh" justifyContent={"space-between"} pr="4px" >
                            <Box w="60%">
                                <Input 
                                    mt="5px"
                                    h="25px" 
                                    pl="5px" 
                                    fontSize={"sm"} 
                                    bgColor={"whiteAlpha.600"} 
                                    placeholder="location at ..."
                                    ref={locationRef}
                                />
                                <Input 
                                    mt="5px"
                                    h="100%" 
                                    pl="5px" 
                                    fontSize={"sm"} 
                                    bgColor={"whiteAlpha.600"} 
                                    placeholder="my moment with ..."
                                    ref={friendRef}
                                />
                            </Box>
                            <Button 
                                w="35%" 
                                m="15px 0px 0px 0px" 
                                colorScheme={"teal"} 
                                bgColor={"whiteAlpha.800"} 
                                variant="outline" 
                                leftIcon={<MdSend/>}
                                onClick={onPostConfirm}
                            >Post</Button>
                        </Flex>
                    </Box>
                    <Box w="45%">
                        <Flex mt="5px" h="20vh">
                            <Box w="100px">
                                <Image
                                    p="0px 8px 3px 3px" 
                                    position={"static"}
                                    src={posts.image? posts.image : bgPost}
                                />
                            </Box>
                            <Flex direction={"column"}>
                                <Flex h="30%">
                                    <Image 
                                        h="30px" 
                                        w="30px" 
                                        borderRadius={"10"} 
                                        objectFit="cover" 
                                        src={user.profilepicture? user.profilepicture : profileUser1}
                                    />
                                    <Text 
                                        fontSize={"sm"} 
                                        m="5px 5px" 
                                        fontWeight={"bold"}
                                    >{user.username}</Text>
                                </Flex>
                                <Box>
                                    <Text w="200px" fontSize="9px" >
                                        at {posts.location? posts.location : "Home"}
                                    </Text>
                                    <Box 
                                        h="40px" 
                                        w="240px"
                                        p="3px" 
                                        border="2px solid" 
                                        borderRadius={"10"} 
                                        fontSize={"10px"} 
                                    >
                                        {posts.caption? posts.caption : "Sedang belajar Javascript"}
                                    </Box>
                                </Box>
                                <Flex h="18px">
                                    <Box 
                                        // h="100%" 
                                        // p="2px"
                                        ml="5px" 
                                        cursor={"pointer"} 
                                        onClick={onLike} 
                                        variant="ghost"
                                    >
                                        {like? <AiFillLike/> : <AiOutlineLike/>}
                                    </Box>
                                    <Text
                                        fontSize="9px" 
                                        ml="10px" 
                                        w="130px"
                                    >
                                        with {posts.friend? posts.friend : "segelas kopi"}
                                    </Text>
                                    <Box>
                                        <Button 
                                            variant={"link"} 
                                            color="black" 
                                            fontSize="13px" 
                                            ml="15px" 
                                            mt="1px"
                                            pt="0px" 
                                            onClick={""}
                                        >   Comment 
                                        </Button>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex mt="25px" h="20vh">
                            <Box w="100px" >
                                <Image
                                    p="0px 8px 3px 3px" 
                                    position={"static"}
                                    src={storyPost}
                                />
                            </Box>
                            <Flex direction={"column"}>
                                <Flex h="30%">
                                    <Image 
                                        h="30px" 
                                        w="30px" 
                                        borderRadius={"10"} 
                                        objectFit="cover" 
                                        src={PPC}
                                    />
                                    <Text 
                                        fontSize={"sm"} 
                                        m="5px 5px" 
                                        fontWeight={"bold"}
                                    >Iwan Merdu</Text>
                                </Flex>
                                <Box>
                                    <Text w="200px" fontSize="9px" >
                                        at Circuit Mandalika
                                    </Text>
                                    <Box 
                                        h="40px" 
                                        w="240px"
                                        p="3px" 
                                        border="2px solid" 
                                        borderRadius={"10"} 
                                        fontSize={"10px"} 
                                    >
                                        Akhirnya event international diadain lagi
                                    </Box>
                                </Box>
                                <Flex h="18px">
                                    <Box 
                                        // h="100%" 
                                        // p="2px"
                                        ml="5px" 
                                        cursor={"pointer"} 
                                        onClick={onLike2} 
                                        variant="ghost"
                                    >
                                        {like? <AiFillLike/> : <AiOutlineLike/>}
                                    </Box>
                                    <Text
                                        fontSize="9px" 
                                        ml="10px" 
                                        w="130px"
                                        mt="3px"
                                    >
                                        with Frank Robben
                                    </Text>
                                    <Box>
                                        <Button 
                                            variant={"link"} 
                                            color="black" 
                                            fontSize="13px" 
                                            ml="15px" 
                                            mt="1px"
                                            pt="0px" 
                                            onClick={""}
                                        >   Comment 
                                        </Button>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
            <Flex
                w="10vw"
                direction={"column"}
                borderLeft={"2px"} 
                borderTop={"2px"} 
                borderColor="blackAlpha.600"
                bgColor={"orange.400"}
            >
                <Text textAlign={"center"} color={"blue"} fontWeight="800" mb="10px" mt="10px">Active</Text>
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
                <Flex h="30px" cursor="pointer">
                    <Image h="25px" w="25px" borderRadius={20} src={PPD} m="2px 0px 0px 10px" />
                    <Text color="blacke" fontSize={"sm"} m="3px 0px 0px 10px" >Luhur Bisnar</Text>
                </Flex>
                <Flex h="30px" cursor="pointer">
                    <Image h="25px" w="25px" borderRadius={20} src={PPE} m="2px 0px 0px 10px" />
                    <Text color="black" fontSize={"sm"} m="3px 0px 0px 10px" >Frank Robben</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Home