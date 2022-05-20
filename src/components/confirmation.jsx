import React from 'react'
import {AlertDialog, 
        AlertDialogOverlay, 
        AlertDialogContent, 
        AlertDialogBody, 
        AlertDialogHeader, 
        AlertDialogFooter, 
        Button} 
        from '@chakra-ui/react'

export default function Confirmation (props) {
    return (
        <AlertDialog
            isOpen={props.isOpen}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        { props.title }
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={props.onButtonCancel} variant="ghost" colorScheme={"red"} w="15%">
                            No
                        </Button>
                        <Button onClick={props.onButtonConfirm} colorScheme='telegram' ml={3} w="15%">
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}