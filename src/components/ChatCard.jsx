import React from 'react';
import Logo from '../images/chatAppLogo.png';

export default function ChatCard({name ,lastMessage,onClick}) {
    console.log(name);
    return (
        <div onClick={onClick} className='themeCard flex flex-row items-center w-4/5 rounded-md py-2 px-1.5 mb-2 cursor-pointer'>
            <div className='themeCard w-fit rounded-full me-2'>
                <img className='w-10' src={Logo} alt="userIcon" />
            </div>
            <div>
                <h1>{name}</h1>
                <p className='text-xs'>{lastMessage}</p>
            </div>
        </div>
    )
}
