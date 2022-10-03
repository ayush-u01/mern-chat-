import {useDisclosure} from '@chakra-ui/hooks'
import { ViewIcon } from '@chakra-ui/icons';
import { Modal } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { ModalOverlay } from '@chakra-ui/react';
import { Button, IconButton, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({user, children}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();

  return <>
  {
    children ? (<span onClick={onOpen}>{children}</span>
    )  : (
        <IconButton d= {{base:"flex"}} icon = {<ViewIcon/>} onClick={onOpen}/>
    )}

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader
                fontSize="40px"
                fontFamily="Work sans"
                d="flex"
                justifyContent="center"
            >{user.name}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Image
                    boarderRadius="full"
                    boxSize="150px"
                    src={user.pic}
                    alt={user.name}
                >

                </Image>
                Hi
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr = {3} onClick={onClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>


  </>;
}

export default ProfileModal