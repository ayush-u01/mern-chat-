import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ChatPage = () => {
    const [chats, setchats] = useState([]);
    const fetchChats = async () => {
        const {data} = await axios.get("api/chat"); // imp 1st time fetched data from backend n shown to frontend using axios
        setchats(data);
    };

    useEffect(() => {
      fetchChats();
    }, [])
    

    // const function (a, b) =>{

    // }


  return (
    <div>
        {
            chats.map((chat) => (
                <div key = {chat._id}>{chat.chatname}</div>
            ))
        }
    </div>
  )
}

export default ChatPage