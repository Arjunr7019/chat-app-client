import React, { createContext, useState, useEffect } from "react";
import { baseUrl } from "../assets/Endpoints";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [userChatsList,setUserChatsList] = useState([]);

  useEffect(() => {
    if (user?._id) {
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
        data.map((e)=> console.log(e.members))
      }).catch(err => {
        console.log("error:", err);
        setUserChatsError(err)
      })
    }
  }, [user]);

  useEffect(() => {
    if (user?._id) {
      userChats?.map((e)=> {
        let findOtherUser = e.members.find((cu)=> cu!==user._id)
        // console.log(findOtherUser);
        fetch(`${baseUrl}/user/find/${findOtherUser}`).then((response) => {
          if (response.status === 200) {
            return response.json(); // Parse the JSON only if status is 200
          } else {
            throw new Error(`Failed with status: ${response.status}`);
          }
        }).then((data) => {
          // console.log(data)
          let members = [];
          members.push(data);
          setUserChatsList(members);
        }).catch(err => {
          console.log("error:", err);
        })
      })
    }
  }, [userChats]);

  return (
    <ChatContext.Provider value={{ userChats, isUserChatLoading, userChatsError,userChatsList }}>
      {children}
    </ChatContext.Provider>
  )
}