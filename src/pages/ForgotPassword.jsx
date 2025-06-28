import React, { useState, useContext, useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import '../App.css';
import { Link } from 'react-router-dom';
import { UserAuthContext } from '../context/UserAuth';
import { Toaster, toast } from 'sonner'

export default function ForgotPassword() {
    const [inputData, setInputData] = useState({ email: "", otp: "", password: "" });
    const { otpSendSuccessfully, getOtp, verifyOtp, otpVerifiedSuccessfully, updateNewPassword } = useContext(UserAuthContext);
    const [secondsLeft, setSecondsLeft] = useState(60);
    const [sessionTimeoutSecondsLeft, setSessionTimeoutSecondsLeft] = useState(240);

    useEffect(() => {
        let timer;

        if (otpSendSuccessfully && secondsLeft > 0) {
            timer = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [secondsLeft, otpSendSuccessfully])

    useEffect(() => {
        let timer;

        if (otpVerifiedSuccessfully === "!border-green-500" && sessionTimeoutSecondsLeft > 0) {
            timer = setInterval(() => {
                setSessionTimeoutSecondsLeft(prev => prev - 1);
            }, 1000);
        }

        if (sessionTimeoutSecondsLeft === 0) {
            toast.warning('Session timeout, try agin later')
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        }

        return () => clearInterval(timer);
    }, [sessionTimeoutSecondsLeft, otpVerifiedSuccessfully])

    return (
        <div className='flex justify-center items-center h-screen'>
            <Toaster position="top-center" />
            <div className='themeCard px-5 rounded-md py-5'>
                <h1 className='text-center text-2xl mb-4'>Forgot Password</h1>
                {otpVerifiedSuccessfully === "!border-green-500" ? <p className='mb-3'>{`session will close in ${sessionTimeoutSecondsLeft}`}</p> : <></>}
                <div className='flex flex-row w-full'>
                    <Input
                        value={inputData.email}
                        onChange={(e) => setInputData(val => { return { ...val, email: e.target.value } })}
                        name="Email"
                        type="Text" />
                    <Button name={otpSendSuccessfully ? secondsLeft === 0 ? "Resend" : `${secondsLeft}` : "Get OTP"} extraClassNames="w-1/4 mb-4 ms-2"
                        onClick={() => {
                            toast.promise(getOtp(inputData.email), {
                                loading: 'Loading...',
                                success: (data) => {
                                    return `${data}`;
                                },
                                error: (error) => {
                                    return `${error}`;
                                },
                            })
                        }} />
                </div>
                {otpSendSuccessfully ? <div>
                    <div className='flex flex-row w-full'>
                        <Input
                            value={inputData.otp}
                            onChange={(e) => setInputData(val => { return { ...val, otp: e.target.value } })}
                            name="OTP"
                            type="Text"
                            extraClassNames={otpVerifiedSuccessfully}
                            disabled={otpVerifiedSuccessfully === "!border-green-500" ? true : false} />
                        <Button name="Verify" extraClassNames="w-1/4 mb-4 ms-2"
                            onClick={() => {
                                toast.promise(verifyOtp(inputData.email, inputData.otp), {
                                    loading: 'Checking...',
                                    success: (data) => {
                                        return `${data}`;
                                    },
                                    error: (error) => {
                                        return `${error}`;
                                    },
                                })
                            }} />
                    </div>
                    <Input
                        value={inputData.password}
                        onChange={(e) => setInputData(val => { return { ...val, password: e.target.value } })}
                        name="New Password"
                        type="password" />
                </div> : <></>}
                <div className='flex justify-center items-center mb-3'>
                    <Link className='text-center cursor-pointer w-full text-sm' to="/login">Back to Login</Link>
                </div>
                {otpSendSuccessfully ? <div className='flex justify-center items-center mb-3'>
                    <Button name="Submit" onClick={() => {
                        toast.promise(updateNewPassword(inputData.email, inputData.password), {
                            loading: 'Updating...',
                            success: (data) => {
                                return `${data}`;
                            },
                            error: (error) => {
                                return `${error}`;
                            },
                        })
                    }} />
                </div> : <></>}
            </div>
        </div>
    )
}
