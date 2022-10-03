
import {Box} from '@chakra-ui/layout';
import {ChatState} from "../Context/ChatProvider";
import SideDrawer from '../components/micellaneous/SideDrawer';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  
  const {user} = ChatState();

    // const function (a, b) =>{

    // }


  return (
    <div style={{width:"100%"}}>
        {user && <SideDrawer/>}
        <Box
          d="flex"
          justifyContent='space-between'
          w='100%'
          h='91.vh'
          p='10px'
        >
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </Box>
    </div>
  )
}

export default ChatPage