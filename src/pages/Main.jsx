import axios from "axios"
import { useEffect, useState } from "react"
import { Container } from "@mui/material"
export const Main = () => {
    const apiKey = process.env.REACT_APP_MockApiKey
    const [chatData, setChatData] = useState([])
    const getData = async () =>{
    const api = `https://${apiKey}.mockapi.io/chat`
        
        try {
        const {data} = await axios(api)
            setChatData(data)
            console.log(chatData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getData()
    },[])
    console.log(chatData);

  return (
    <>
    <Container>Hoş geldin name</Container>
    </>
  )
}
