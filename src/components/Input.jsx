import React from 'react';
import '../App.css'

export default function Input({ name, type }) {
    return (
        <div className='relative mb-4'>
            <input id='inputText' className='inputForm w-2xs rounded-md p-2' style={{ border: "1px solid #1515154d" }} type={type} />
            <label className='inputLabel' htmlFor="inputText">{name}</label>
        </div>
    )
}
