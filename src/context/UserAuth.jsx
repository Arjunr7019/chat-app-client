
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

    const getOtp = (email) => {
        if (email) {
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
                toast.warning(err)
            })
        } else {
            console.log("Error: empty email field");
        }
    };

    const verifyOtp = (email, otp) => {
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
                    return response.json();
                } else {
                    throw new Error(`Failed with status: ${response.status}`);
                }
            }).then((data) => {
                toast.success('OTP Verified Successfully');
                setOtpVerifiedSuccessfully("!border-green-500")
            }).catch(err => {
                console.log("error:", err);
                toast.warning(err)
                setOtpVerifiedSuccessfully("!border-red-500")
            })
        } else {
            console.log("Error:email and otp field are empty");
        }
    }

    const updateNewPassword = (email, password) => {
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
                    return response.json();
                } else {
                    throw new Error(`Failed with status: ${response.status}`);
                }
            }).then((data) => {
                toast.success('New Password Updated Successfully');
                setTimeout(() => {
                    navigate("/login");
                }, 5000);
            }).catch(err => {
                console.log("error:", err);
                toast.warning(err)
                // setOtpVerifiedSuccessfully("!border-red-500")
            })
        } else {
            console.log("Error:email and new password field are empty");
        }
    }

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