import React, { useState } from 'react';
import '../App.css'

export default function Input({ name, type,value,onChange }) {
    const [showPassword,setShowPassword] = useState(false);
    return (
        <div className='relative w-full' style={name === "Message" ? { marginBottom: "0" } : { marginBottom: "1rem" }}>
            <input
                id='inputText'
                className='inputForm rounded-md p-2'
                placeholder={name === "Message" ? "Message" : ""}
                style={name === "Message" ? { width: "100%" } : { width: "18rem" }}
                type={showPassword ? "text": type}
                autoComplete={name === "Message" ? "off" : "on"} 
                onChange={onChange}
                value={value}/>
            {name === "Message" ? <></> : <label className={value===""?'inputLabel':'inputLabelActive'} htmlFor="inputText">{name}</label>}
            {name === "Password" ? <p className='absolute right-2 top-0 translate-y-1/3 cursor-pointer' 
             onClick={()=> showPassword ? setShowPassword(false):setShowPassword(true)}>show</p>:<></>}
        </div>
    )
}
