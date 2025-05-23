import React, { useContext, useEffect, useState } from 'react';
import '../App.css';
import Logo from "../images/chatAppLogo.png";
import ChatCard from '../components/ChatCard';
import ChatSectionBg from "../images/loginPageBg-image.png";
import Input from '../components/Input';
import Button from '../components/Button';
import { UserAuthContext } from '../context/UserAuth';
import { ChatContext } from '../context/ChatContext';

export default function Chat() {
  const { user, setUserData, logoutUser } = useContext(UserAuthContext);
  const { userChats,
    isUserChatLoading,
    userChatsError,
    userChatsList,
    getFullChatMessages,
    activeChatUserChats,
    sendMessage,
    newMessage,
    findFriend,
    getNewFriend,
    createNewChat,
    cleanUpData } = useContext(ChatContext);
  const [textMessage, setTextMessage] = useState();
  const [email, setEmail] = useState();
  const [findNewUser, setFindNewUser] = useState(false);

  const list = userChatsList;

  // console.log(userChatsList);
  useEffect(() => {
    // console.log(newMessage)
    if (newMessage) {
      setTextMessage("");
    }
  }, [newMessage])

  const convertToIST = (timestamp) => {
    const date = new Date(timestamp);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", // IST timezone
    });
  };

  return (
    <div className='h-screen flex justify-center items-center flex-row py-2'>
      <div className='themeCard flex justify-between items-center flex-col h-full m-2 rounded-md' style={{ width: "25%" }}>
        <div className='w-full flex flex-col items-center'>
          <div className='flex justify-center items-center flex-row py-3'>
            <img className='w-10 me-2' src={Logo} alt="logo" />
            <h1 className='text-lg font-medium'>JellyFish</h1>
          </div>

          {findNewUser ? <div className='w-full flex flex-col items-center'>
            <div className='w-4/5 flex justify-center pb-2'>
              <Button extraClassNames="w-full m-0" name="Back To Chats" onClick={() => findNewUser ? setFindNewUser(false) : setFindNewUser(true)} />
            </div>
            <div className='w-4/5 flex justify-center pb-2'>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className='inputForm w-4/5 rounded-md p-2' placeholder='Find New Friend' type="text" />
              <Button extraClassNames="ms-2" name="Find" onClick={() => getNewFriend(email)} />
            </div>
            {findFriend ? <div className='w-4/5 flex flex-row items-center justify-center'>
              <ChatCard userId={findFriend?._id} name={findFriend?.name} key={findFriend?._id} />
              <Button extraClassNames="ms-2" name="Add" onClick={()=> createNewChat()} />
            </div>:<p className='text-gray-500'>Search Friend by Email</p>}
            {/* for find new friend response section */}
          </div> :
          // ---------------chatList[friends]----------------
            <div className='w-full flex flex-col items-center'>
              <div className='w-4/5 flex justify-center pb-2'>
                <Button extraClassNames="w-full m-0" name="Add New User" onClick={() => findNewUser ? setFindNewUser(false) : setFindNewUser(true)} />
              </div>
              {list?.map((chatUser, index) =>
                <ChatCard onClick={() => getFullChatMessages(index)} 
                userId={chatUser._id} name={chatUser.name} key={chatUser._id} lastMessage="hi..." extraClassNames="mb-2" />
              )}
            </div>}
        </div>
        {/* ---------loggedIn user data----------- */}
        <div className='w-full flex flex-row justify-between px-5 pb-2'>
          <div className='flex flex-row'>
            <img src={Logo} className='w-10 me-2' alt="userIcon" />
            <h1 className='my-auto'>{user?.name}</h1>
          </div>
          <Button name="Logout" onClick={() => { logoutUser(); setUserData(null); cleanUpData() }} />
        </div>
      </div>


      {activeChatUserChats ? <div className='themeCard h-full flex flex-col items-center m-2 rounded-md' style={{ width: "75%" }}>
        <h1 className='text-center text-lg font-medium py-3'>{activeChatUserChats?.userData?.name}</h1>
        <div className='flex justify-center items-center w-full' style={{ height: "80%" }}>
          <div className='themeCard h-full rounded-md flex justify-center items-center' style={{ width: "95%" }}>
            {/* <img className='m-auto' src={ChatSectionBg} alt="img" /> */}
            <div style={{ overflowY: "scroll" }} className='w-full h-full p-3'>
              {activeChatUserChats?.userChats?.map((chat, index) =>
                <div key={index}
                  className={activeChatUserChats?.userData?._id === chat?.senderId ?
                    'w-full flex flex-row justify-start items-end' : 'w-full flex flex-row justify-end items-end'}>
                  <p
                    className={activeChatUserChats?.userData?._id === chat?.senderId ?
                      'themeCard w-fit px-2 py-1 rounded-md rounded-bl-none mb-2' : 'themeCard w-fit px-2 py-1 rounded-md rounded-br-none mb-2'}
                  >{chat.text}</p>
                  <p className='ps-1 pb-2 m-0' style={{ fontSize: "9px" }}>{convertToIST(chat.createdAt)}</p>
                </div>)
              }
              {(Array.isArray(activeChatUserChats?.userChats) && activeChatUserChats?.userChats.length === 0) ?
                <div className='w-full h-full flex justify-center items-center'>
                  <p className='text-center'>Chat Session is Empty <br /> Start Conversation</p>
                </div>
                : <></>
              }
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center flex-row mt-2' style={{ width: "95%" }}>
          <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} name="Message" type="Text" />
          <Button extraClassNames="ms-2" onClick={() => sendMessage(textMessage)} name="Send" />
        </div>
      </div> :
        <div className='themeCard h-full flex flex-col justify-center items-center m-2 rounded-md' style={{ width: "75%" }}>
          <img src={ChatSectionBg} alt="img" />
          <h1>Welcome to JellyFish Chat App</h1>
        </div>}
    </div>
  )
}
