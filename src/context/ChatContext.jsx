import React, { createContext, useState, useEffect } from "react";
import { baseUrl } from "../assets/Endpoints";

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [userChatsList, setUserChatsList] = useState([]);
  const [activeChatUserChats, setActiveChatUserChats] = useState();

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
        // data.map((e)=> console.log(e.members))
      }).catch(err => {
        console.log("error:", err);
        setUserChatsError(err)
      })
    }
  }, [user]);

  useEffect(() => {
    let members = []
    if (user?._id) {
      userChats?.map((e) => {
        let findOtherUser = e.members.find((cu) => cu !== user._id)
        members.push(findOtherUser);
      })
      fetch(`${baseUrl}/user`).then((response) => {
        if (response.status === 200) {
          return response.json(); // Parse the JSON only if status is 200
        } else {
          throw new Error(`Failed with status: ${response.status}`);
        }
      }).then((data) => {
        // console.log(data)
        data.map((e) => {
          if (members.includes(e._id)) {
            setUserChatsList(item => [...item, e]);
          }
        })
      }).catch(err => {
        console.log("error:", err);
      })
    }
  }, [userChats]);

  const getFullChatMessages = (index) => {
    console.log(userChats[index]._id);
    setActiveChatUserChats(val=>{return{...val,userData:userChatsList[index]}})
    fetch(`${baseUrl}/messages/${userChats[index]._id}`).then((response) => {
      if (response.status === 200) {
        return response.json(); // Parse the JSON only if status is 200
      } else {
        throw new Error(`Failed with status: ${response.status}`);
      }
    }).then((data) => {
      setActiveChatUserChats(val=> {return{...val,userChats:data}})
      console.log(data)
    }).catch(err => {
      console.log("error:", err);
    })
  }

  return (
    <ChatContext.Provider value={{ userChats, isUserChatLoading, userChatsError, userChatsList, getFullChatMessages,activeChatUserChats }}>
      {children}
    </ChatContext.Provider>
  )
}