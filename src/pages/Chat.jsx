import React, { useContext } from 'react';
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
  const { userChats, isUserChatLoading, userChatsError, userChatsList, getFullChatMessages, activeChatUserChats } = useContext(ChatContext);

  const list = userChatsList;

  // console.log(typeof(activeChatUserChats?.userChats))

  return (
    <div className='h-screen flex justify-center items-center flex-row py-2'>
      <div className='themeCard flex justify-between items-center flex-col h-full m-2 rounded-md' style={{ width: "25%" }}>
        <div className='w-full flex flex-col items-center'>
          <div className='flex justify-center items-center flex-row py-3'>
            <img className='w-10 me-2' src={Logo} alt="logo" />
            <h1 className='text-lg font-medium'>JellyFish</h1>
          </div>
          {list?.map((chatUser, index) =>
            <ChatCard onClick={() => getFullChatMessages(index)} name={chatUser.name} key={chatUser.name} lastMessage="Hi..." />
          )}
        </div>
        <div className='w-full flex flex-row justify-between px-2 pb-2'>
          <div className='flex flex-row'>
            <img src={Logo} className='w-10 me-2' alt="userIcon" />
            <h1 className='my-auto'>{user?.name}</h1>
          </div>
          <Button name="Logout" onClick={() => { logoutUser(); setUserData(null) }} />
        </div>
      </div>


      {activeChatUserChats ? <div className='themeCard h-full flex flex-col items-center m-2 rounded-md' style={{ width: "75%" }}>
        <h1 className='text-center text-lg font-medium py-3'>{activeChatUserChats?.userData?.name}</h1>
        <div className='flex justify-center items-center w-full' style={{ height: "80%" }}>
          <div className='themeCard h-full rounded-md flex justify-center items-center' style={{ width: "95%" }}>
            {/* <img className='m-auto' src={ChatSectionBg} alt="img" /> */}
            <div className='w-full h-full p-3'>
              {activeChatUserChats?.userChats?.map((chat, index) =>
                <div key={index}
                  className={activeChatUserChats?.userData?._id === chat?.senderId ?
                    'w-full flex flex-row justify-end' : 'w-full flex flex-row justify-end'}>
                  <p
                    className={activeChatUserChats?.userData?._id === chat?.senderId ?
                      'themeCard w-fit px-2 py-1 rounded-md rounded-bl-none' : 'themeCard w-fit px-2 py-1 rounded-md rounded-br-none'}
                  >{chat.text}</p>
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
          <Input name="Message" type="Text" />
          <Button name="Send" />
        </div>
      </div> :
        <div className='themeCard h-full flex flex-col justify-center items-center m-2 rounded-md' style={{ width: "75%" }}>
          <img src={ChatSectionBg} alt="img" />
          <h1>Welcome to JellyFish Chat App</h1>
        </div>}
    </div>
  )
}
