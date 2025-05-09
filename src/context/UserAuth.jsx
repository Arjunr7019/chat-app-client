
import React, { createContext, useState, useEffect } from "react";
import Services from "../localStorage/Services";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/Endpoints";
import { Toaster, toast } from 'sonner'

export const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [otpSendSuccessfully,setOtpSendSuccessfully] = useState(false);

    const navigate = useNavigate();

    const setUserData = (data) => {
        setUser(data);
    };

    const logoutUser = () => {
        Services.Logout();
        navigate("/login")
    }

    useEffect(() => {
        Services.getUser().then(res => {
            if (res) {
                setUserData(res);
                navigate("/")
            } else {
                setUserData(null);
                navigate("/login")
            }
        })
    }, [])

    const getOtp = (email) => {
        if(email){
            fetch(`${baseUrl}/forgotPassword/${email}`).then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error(`Failed with status: ${response.status}`);
                }
            }).then((data) => {
                setOtpSendSuccessfully(true);
                toast.success('OTP Sent Successfully')
            }).catch(err => {
                console.log("error:", err);
            })
        }else{
            console.log("Error: empty email field");
        }
    };

    const verifyOtp = ()=>{

    }

    return (
        <UserAuthContext.Provider value={{ user, setUser, setUserData, logoutUser,getOtp,otpSendSuccessfully,verifyOtp }}>
            <Toaster position="top-center"/>
            {children}
        </UserAuthContext.Provider>
    );
};