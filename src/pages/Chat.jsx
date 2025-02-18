import React from 'react';
import '../App.css';
import Logo from "../images/chatAppLogo.png";
import ChatCard from '../components/ChatCard';
import ChatSectionBg from "../images/loginPageBg-image.png";

export default function Chat() {
  return (
    <div className='h-screen flex justify-center items-center flex-row py-2'>
      <div className='themeCard flex items-center flex-col h-full m-2 rounded-md' style={{ width: "25%" }}>
        <div className='flex justify-center items-center flex-row py-3'>
          <img className='w-10 me-2' src={Logo} alt="logo" />
          <h1 className='text-lg font-medium'>JellyFish</h1>
        </div>
        <ChatCard name="Rohit" lastMessage="Hi..." />
        <ChatCard name="Rohit" lastMessage="Hi..." />
        <ChatCard name="Rohit" lastMessage="Hi..." />
        <ChatCard name="Rohit" lastMessage="Hi..." />
      </div>
      <div className='themeCard h-full m-2 rounded-md' style={{ width: "75%" }}>
        <h1 className='text-center text-lg font-medium py-3'>Name</h1>
        <div className='flex justify-center items-center'>
          <img className='my-auto' src={ChatSectionBg} alt="img" />
        </div>
      </div>
    </div>
  )
}
