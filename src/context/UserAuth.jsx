
import React, { createContext, useState, useEffect } from "react";
import Services from "../localStorage/Services";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../assets/Endpoints";
import { Toaster, toast } from 'sonner';

export const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [otpSendSuccessfully, setOtpSendSuccessfully] = useState(false);
    const [otpVerifiedSuccessfully, setOtpVerifiedSuccessfully] = useState("");

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

    const getOtp = (email) => new Promise((resolve, reject) => {
        if (email !== "") {
            fetch(`${baseUrl}/forgotPassword/${email}`).then((response) => {
                if (response.status === 200) {
                    resolve("OTP Sent Successfully")
                    return response.json();
                } else if (response.status === 429) {
                    reject("Too many requests from this IP, please try again after 15 minutes.");
                } else {
                    reject("error while sending OTP try again later")
                    throw new Error(`Failed with status: ${response.status}`);
                }
            }).then((data) => {
                setOtpSendSuccessfully(true);
            }).catch(err => {
                console.log("error:", err);
            })
        } else {
            toast.warning("Error: empty email field")
            console.log("Error: empty email field");
        }
    })

    const verifyOtp = (email, otp) => new Promise((resolve, reject) => {
        if (email !== "" && otp !== "") {
            fetch(`${baseUrl}/forgotPassword/verifyOtp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    otp
                }),
            }).then((response) => {
                if (response.status === 200) {
                    resolve('OTP Verified Successfully')
                    return response.json();
                } else if (response.status === 429) {
                    reject("Too many requests from this IP, please try again after 15 minutes.");
                } else {
                    reject("not valid OTP")
                    throw new Error(`Failed with status: ${response.status}`);
                }
            }).then((data) => {
                setOtpVerifiedSuccessfully("!border-green-500")
            }).catch(err => {
                console.log("error:", err);
                setOtpVerifiedSuccessfully("!border-red-500")
            })
        } else {
            toast.warning("Error:email and otp field are empty")
            console.log("Error:email and otp field are empty");
        }
    })

    const updateNewPassword = (email, password) => new Promise((resolve, reject) => {
        if (email !== "" && password !== "") {
            fetch(`${baseUrl}/forgotPassword/updateNewPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            }).then((response) => {
                if (response.status === 200) {
                    resolve("New Password Updated Successfully and Reridecting to Login page")
                    return response.json();
                } else if (response.status === 429) {
                    reject("Too many requests from this IP, please try again after 15 minutes.");
                } else {
                    reject("error while updating password. try again later")
                    throw new Error(`Failed with status: ${response.status}`);
                }
            }).then((data) => {
                setTimeout(() => {
                    setOtpSendSuccessfully(false);
                    setOtpVerifiedSuccessfully("");
                    navigate("/login");
                }, 5000);
            }).catch(err => {
                console.log("error:", err);
                // setOtpVerifiedSuccessfully("!border-red-500")
            })
        } else {
            toast.warning("Error:email and new password field are empty")
            console.log("Error:email and new password field are empty");
        }
    })

    return (
        <UserAuthContext.Provider
            value={{
                user,
                setUser,
                setUserData,
                logoutUser,
                getOtp,
                otpSendSuccessfully,
                verifyOtp,
                otpVerifiedSuccessfully,
                updateNewPassword
            }}>
            <Toaster position="top-center" />
            {children}
        </UserAuthContext.Provider>
    );
};