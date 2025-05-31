import React, { useContext } from 'react';
import Logo from '../images/chatAppLogo.png';
import { ChatContext } from '../context/ChatContext';

export default function ChatCard({name ,lastMessage,onClick,userId,extraClassNames}) {
    const{onlineUsers} = useContext(ChatContext);

    console.log(onlineUsers?.some((user)=> user?.userId === userId) ? `${name}: online` : ``);
    return (
        <div onClick={onClick} 
        className={`themeCard flex flex-row items-center rounded-md py-2 px-1.5 cursor-pointer relative ${extraClassNames}`}>
            <div className='themeCard w-fit rounded-full me-2'>
                <img className='w-10' src={Logo} alt="userIcon" />
            </div>
            <div>
                <h1>{name}</h1>
                <p className='text-xs'>{lastMessage}</p>
            </div>
            {onlineUsers?.some((user)=> user?.userId === userId) ? 
            <span style={{width:"10px",height:"10px",backgroundColor:"#363636"}} className='absolute top-0 right-0 rounded-2xl m-2'>
            </span>:<></>}
        </div>
    )
}
