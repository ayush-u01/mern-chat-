import { Container } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import {useHistory} from "react-router";

const Homepage = () => {

  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localstorage.getItem("userInfo"));

    if(user) history.push("/chats");

  },[history]);

  return (
    <div>HomePage</div>
}

export default Homepage