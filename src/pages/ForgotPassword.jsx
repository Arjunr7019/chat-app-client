import React, { useState, useContext, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import '../App.css';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../context/UserAuth';
import { Toaster, toast } from 'sonner'

export default function ForgotPassword() {
    const [inputData, setInputData] = useState({ email: "", otp: "", password: "" });
    const { otpSendSuccessfully, getOtp } = useContext(UserAuthContext);
    const [secondsLeft, setSecondsLeft] = useState(60);

    useEffect(() => {
        let timer;

        if (otpSendSuccessfully && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [secondsLeft,otpSendSuccessfully])

    return (
        <div className='flex justify-center items-center h-screen'>
            <Toaster position="top-center" />
            <div className='themeCard px-5 rounded-md py-5'>
                <h1 className='text-center text-2xl mb-4'>Forgot Password</h1>
                <div className='flex flex-row w-full'>
                    <Input
                        value={inputData.email}
                        onChange={(e) => setInputData(val => { return { ...val, email: e.target.value } })}
                        name="Email"
                        type="Text" />
                    <Button name={otpSendSuccessfully ? secondsLeft === 0?"Resend":`${secondsLeft}` : "Get OTP"} extraClassNames="w-1/4 mb-4 ms-2"
                        onClick={() => { getOtp(inputData.email); inputData.email === "" ? toast.warning('Email input is empty') : "" }} />
                </div>
                {otpSendSuccessfully ? <div>
                    <Input
                        value={inputData.otp}
                        onChange={(e) => setInputData(val => { return { ...val, otp: e.target.value } })}
                        name="OTP"
                        type="Text" />
                    <Input
                        value={inputData.password}
                        onChange={(e) => setInputData(val => { return { ...val, password: e.target.value } })}
                        name="New Password"
                        type="Text" />
                </div> : <></>}
                <div className='flex justify-center items-center mb-3'>
                    <Link className='text-center cursor-pointer w-full text-sm' to="/login">Back to Login</Link>
                </div>
                {otpSendSuccessfully ? <div className='flex justify-center items-center mb-3'>
                    <Button name="Submit" />
                </div> : <></>}
            </div>
        </div>
    )
}
