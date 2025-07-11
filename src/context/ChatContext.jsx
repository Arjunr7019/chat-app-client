import React, { createContext, useState, useEffect } from "react";
import { baseUrl } from "../assets/Endpoints";
import { webSoketUrl } from "../assets/Endpoints";
import Services from "../localStorage/Services";
import { io } from "socket.io-client";
import { Toaster, toast } from 'sonner'

export const ChatContext = createContext(null);

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatLoading, setIsUserChatLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [userChatsList, setUserChatsList] = useState([]);
  const [activeChatUserChats, setActiveChatUserChats] = useState();
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [findFriend, setFindFriend] = useState(null);
  const [chatIdAndUserId, setChatIdAndUserId] = useState()

  let senderId;
  Services.getUser().then(res => senderId = res?._id)

  // console.log(userChats)

  useEffect(() => {
    const newSocket = io(`${webSoketUrl}`);
    setSocket(newSocket);
    // console.log(newSocket)

    return () => {
      newSocket.disconnect();
    }
  }, [user])

  useEffect(() => {
    if (socket === null) return
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    })

    return () => {
      socket.off("getOnlineUsers")
    }
  }, [socket]);
  // console.log("onlineUsers",onlineUsers)

  // console.log(activeChatUserChats?.chatId)

  // send message
  useEffect(() => {
    if (socket === null) return
    const recipientId = activeChatUserChats?.userData?.user?._id;

    console.log(activeChatUserChats)
    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  useEffect(() => {
    if (socket === null) return

    socket.on("getMessage", res => {
      // console.log("activeChatUserChats", activeChatUserChats?.chatId)
      // console.log("response", res.chatId)
      if (activeChatUserChats?.chatId !== res.chatId) return

      setActiveChatUserChats((val) => ({ ...val, userChats: [...val.userChats, res] }))
    });

    return () => {
      socket.off("getMessage");
    }
  }, [socket, activeChatUserChats])

  //total active chat users list
  useEffect(() => {
    if (user?._id) {
      setIsUserChatLoading(true);
      setUserChatsError(null);
      fetch(`${baseUrl}/chats/${user?._id}`).then((response) => {
        if (response.status === 200) {
          setIsUserChatLoading(false);
          return response.json();
        } else if (response.status === 429) {
          toast.warning("Too many requests from this IP, please try again after 15 minutes.");
        } else {
          throw new Error(`Failed with status: ${response.status}`);
        }
      }).then((data) => {
        setUserChats(data);
        const chatUserArray = data?.map((e) => {
          let findOtherUser = e.members.find((cu) => cu !== user._id);
          return {
            userId: findOtherUser,
            chatId: e._id,
          };
        });
        // console.log(data)
        setChatIdAndUserId(JSON.stringify(chatUserArray));
        // data.map((e)=> console.log(e.members))
      }).catch(err => {
        console.log("error:", err);
        setUserChatsError(err)
      })
    }
  }, [user]);

  // getting active chat users data
  useEffect(() => {
    let members = []
    console.log(user?._id)
    userChats?.map((e) => {
      let findOtherUser = e.members.find((cu) => cu !== user._id)
      members.push(findOtherUser);
    })
    if (user?._id) {
      fetch(`${baseUrl}/user`).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Failed with status: ${response.status}`);
        }
      }).then((data) => {
        // console.log(data)
        data.map((e) => {
          if (members.includes(e._id)) {
           setUserChatsList(prev => ([...prev, { user: e }]));
            console.log("membersId", e._id);
          }
        })
      }).catch(err => {
        console.log("error:", err);
      })
    }
  }, [userChats]);

  // console.log("userChats", userChats);
  console.log("userChatsList", userChatsList);
  // console.log("chatIdAndUserId", chatIdAndUserId)

  // to get last message api call
  // useEffect(() => {
  //   if (user?._id) {
  //     // console.log("chatIdAndUserId", chatIdAndUserId)
  //     fetch(`${baseUrl}/messages/lastMessage/${chatIdAndUserId}`).then((response) => {
  //       if (response.status === 200) {
  //         return response.json();
  //       } else if (response.status === 429) {
  //         toast.warning("Too many requests from this IP, please try again after 15 minutes.");
  //       } else {
  //         throw new Error(`Failed with status: ${response.status}`);
  //       }
  //     }).then((data) => {
  //       setUserChatsList(data)
  //     }).catch(err => {
  //       console.log("error:", err);
  //     })
  //   }
  // }, [userChats])

  //getting full chats of particular user
  const getFullChatMessages = (index) => {
    // console.log("getFullChatMessages",userChats[index]._id);
    setActiveChatUserChats(val => { return { ...val, userChats: null } })
    setActiveChatUserChats(val => { return { ...val, userData: userChatsList[index] } })
    fetch(`${baseUrl}/messages/${userChats[index]._id}`).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 429) {
        toast.warning("Too many requests from this IP, please try again after 15 minutes.");
      } else {
        throw new Error(`Failed with status: ${response.status}`);
      }
    }).then((data) => {
      setActiveChatUserChats(val => { return { ...val, userChats: data } })
      // console.log(data)
    }).catch(err => {
      console.log("error:", err);
    })
    setActiveChatUserChats(val => { return { ...val, chatId: userChats[index]._id } })
  }

  const sendMessage = (text) => {
    // console.log("chatId",activeChatUserChats.chatId);

    // console.log("text",text)
    if (text) {
      fetch(`${baseUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: activeChatUserChats.chatId,
          senderId,
          text
        }),
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 429) {
          toast.warning("Too many requests from this IP, please try again after 15 minutes.");
        } else {
          throw new Error(`Failed with status: ${response.status}`);
        }
      }).then((data) => {
        // chats.push(data)
        setActiveChatUserChats((val) => ({ ...val, userChats: [...val.userChats, data] }))
        setNewMessage(data)
        // console.log("response", data)
      }).catch(err => {
        console.log("error:", err);
      })
    }
  }

  const getNewFriend = (email) => {
    fetch(`${baseUrl}/user/findfriend/${email}`).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 429) {
        toast.warning("Too many requests from this IP, please try again after 15 minutes.");
      } else {
        throw new Error(`Failed with status: ${response.status}`);
      }
    }).then((data) => {
      setFindFriend(data)
      console.log(data)
    }).catch(err => {
      console.log("error:", err);
      setFindFriend(err)
    })
  }

  const createNewChat = () => {
    const firstId = senderId;
    const secondId = findFriend?._id
    if (secondId) {
      fetch(`${baseUrl}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstId,
          secondId
        }),
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 429) {
          toast.warning("Too many requests from this IP, please try again after 15 minutes.");
        } else {
          throw new Error(`Failed with status: ${response.status}`);
        }
      }).then((data) => {
        console.log("response", data)
        updateActiveUsers();
        // setUserChats(prevArray => [...prevArray, data]);
      }).catch(err => {
        console.log("error:", err);
      })
    }
  }
  const updateActiveUsers = () => {
    if (user?._id) {
      setIsUserChatLoading(true);
      setUserChatsError(null);
      fetch(`${baseUrl}/chats/${user?._id}`).then((response) => {
        if (response.status === 200) {
          setIsUserChatLoading(false);
          return response.json();
        } else if (response.status === 429) {
          toast.warning("Too many requests from this IP, please try again after 15 minutes.");
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
  };

  const cleanUpData = () => {
    setUserChats(null);
    setUserChatsList([]);
    setActiveChatUserChats();
    setSocket(null);
    setOnlineUsers([]);
    setNewMessage(null);
    setFindFriend(null)
  }
  return (
    <ChatContext.Provider value={{
      userChats,
      isUserChatLoading,
      userChatsError,
      userChatsList,
      getFullChatMessages,
      activeChatUserChats,
      sendMessage,
      onlineUsers,
      newMessage,
      findFriend,
      getNewFriend,
      createNewChat,
      cleanUpData
    }}>
      <Toaster position="top-center" />
      {children}
    </ChatContext.Provider>
  )
}