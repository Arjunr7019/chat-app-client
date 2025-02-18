import React from 'react';
import '../App.css';
import Logo from '../images/chatAppLogo.png';

export default function Chat() {
  return (
    <div className='h-screen flex justify-center items-center flex-row py-2'>
      <div className='themeCard flex items-center flex-col h-full m-2 rounded-md' style={{ width: "25%" }}>
        <div className='flex justify-center items-center flex-row py-3'>
          <img className='w-10 me-2' src={Logo} alt="logo" />
          <h1 className='text-lg font-medium'>JellyFish</h1>
        </div>
        <div className='themeCard flex flex-row items-center w-4/5 rounded-md py-2 px-1.5'>
          <div className='themeCard w-fit rounded-full me-2'>
            <img className='w-10' src={Logo} alt="userIcon" />
          </div>
          <div>
            <h1>Name</h1>
            <p className='text-xs'>Last Meaasage</p>
          </div>
        </div>
      </div>
      <div className='themeCard h-full m-2 rounded-md' style={{ width: "75%" }}>
        right
      </div>
    </div>
  )
}
