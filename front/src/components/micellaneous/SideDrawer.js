import {Box, Text} from '@chakra-ui/layout'
import { Menu,  MenuButton,  MenuDivider,  MenuItem,  MenuList,  Tooltip, useQuery } from '@chakra-ui/react';
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
import { Avatar } from '@chakra-ui/avatar';
import React, {useState} from 'react';
import {ChatState} from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';

function SideDrawer() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const {user} = ChatState();

  return (
    <Box 
        d="flex"
        justifyContent="center"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
    >
        <Tooltip 
            label="Search Users to Chat"
            hasArrow placement = "bottom-end"
        >
            <Button variant="ghost">
                <i class = "fas fa-search"></i>
                <Text d ={{base: "none", md:"flex"}} px="4">
                    Search User
                </Text>
            </Button>

        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
            Talk-A-Tive
        </Text>

        <Menu>
            <MenuButton p= {1}>
                <BellIcon></BellIcon>
            </MenuButton>
            {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
            <MenuButton as = {Button} rightIcon = {<ChevronDownIcon/>}>
                <Avatar size='sm/' cursor='pointer' name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
                <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider/>
                <MenuItem>Logout</MenuItem>
            </MenuList>
        </Menu>

    </Box>
  )
}

export default SideDrawer