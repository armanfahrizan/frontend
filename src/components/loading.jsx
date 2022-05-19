import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, Flex, Spinner, Text } from '@chakra-ui/react'

export default function Loading (props) {
    return (
        <Modal isOpen={props.onLoading}>
            <ModalOverlay />
            <ModalContent 
                w="25vw" 
                mt="150px" 
                bgColor={"whiteAlpha.800"}
            >
                <ModalBody >
                    <Flex justifyContent={"center"}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='orange.400'
                            color='orange.800'
                            size='xl'
                        />
                        <Text 
                            ml="15px" 
                            textAlign={"center"} 
                            fontSize="2xl" 
                            fontWeight="bold" 
                            color="blue.700"
                        >Loading. . .</Text>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}