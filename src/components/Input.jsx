import React, { useState } from 'react';
import '../App.css';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

export default function Input({ name, type,value,onChange,extraClassNames }) {
    const [showPassword,setShowPassword] = useState(false);
    const nameCheck = ["Message","Password","OTP","New Password","Gender","Name"]
    const inputWidthCheck = ["OTP","New Password","Message"]
    return (
        <div className='relative w-full' style={name === "Message" ? { marginBottom: "0" } : { marginBottom: "1rem" }}>
            <input
                id='inputText'
                className={`inputForm rounded-md p-2 ${extraClassNames}`}
                placeholder={name === "Message" ? "Message" : ""}
                style={inputWidthCheck.includes(name) ? { width: "100%" } : { width: "18rem" }}
                type={showPassword ? "text": type}
                autoComplete={nameCheck.includes(name) ? "off" : "Email"} 
                onChange={onChange}
                value={value}/>
            {name === "Message" ? <></> : <label className={value===""?'inputLabel':'inputLabelActive'} htmlFor="inputText">{name}</label>}
            {name === "Password" ? <a className='absolute right-2 top-0 translate-y-1/2 h-5 cursor-pointer flex justify-center items-center' 
             onClick={()=> showPassword ? setShowPassword(false):setShowPassword(true)}>{
                showPassword ? <IoEyeOutline className='w-5' />:<IoEyeOffOutline className='w-5'/>}</a>:<></>}
        </div>
    )
}
