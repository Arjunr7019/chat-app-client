import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import '../App.css';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [inputData, setInputData] = useState({ email: "", otp: "" });

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='themeCard px-5 rounded-md py-5'>
                <h1 className='text-center text-3xl mb-4'>Login</h1>
                <div className='flex flex-row w-full'>
                    <Input
                        value={inputData.email}
                        onChange={(e) => setInputData(val => { return { ...val, email: e.target.value } })}
                        name="Email"
                        type="Text" />
                        <Button name="Get OTP"/>
                </div>
                <div className='flex justify-center items-center mb-3'>
                    <Link className='text-center cursor-pointer w-full text-sm' to="/login">Back to Login</Link>
                </div>
                {/* <div className='flex justify-center items-center mb-3'>
          <Button name="Login" />
        </div> */}
            </div>
        </div>
    )
}
