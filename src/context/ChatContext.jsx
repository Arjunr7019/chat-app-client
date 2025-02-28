import React, { createContext, useState, useEffect } from "react";
import { baseUrl } from "../assets/Endpoints";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading,setIsUserChatLoading] = useState(false);
    const [userChatsError,setUserChatsError] = useState(null);

    useEffect(()=>{
        if(user?._id){
            setIsUserChatLoading(true);
            setUserChatsError(null);
            fetch(`${baseUrl}/chats/${user?._id}`).then((response) => {
                  if (response.status === 200) {
                    setIsUserChatLoading(false);
                    return response.json(); // Parse the JSON only if status is 200
                  } else {
                    throw new Error(`Failed with status: ${response.status}`);
                  }
                }).then((data) => {
                  setUserChats(data);
                  console.log(data)
                }).catch(err => {
                  console.log("error:", err);
                  setUserChatsError(err)
                })
        }
    },[user])

    return (
        <ChatContext.Provider value={{userChats,isUserChatLoading,userChatsError}}>
            {children}
        </ChatContext.Provider>
    )
}