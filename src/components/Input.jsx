import React from 'react';
import '../App.css'

export default function Input({ name, type,value,onChange }) {
    return (
        <div className='relative w-full' style={name === "Message" ? { marginBottom: "0" } : { marginBottom: "1rem" }}>
            <input
                id='inputText'
                className='inputForm rounded-md p-2'
                placeholder={name === "Message" ? "Message" : ""}
                style={name === "Message" ? { border: "1px solid #1515154d", width: "100%" } : { border: "1px solid #1515154d", width: "18rem" }}
                type={type}
                autoComplete={name === "Message" ? "off" : "on"} 
                onChange={onChange}
                value={value}/>
            {name === "Message" ? <></> : <label className={value===""?'inputLabel':'inputLabelActive'} htmlFor="inputText">{name}</label>}
        </div>
    )
}
