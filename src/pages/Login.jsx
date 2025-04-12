import React, { useState, useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserAuthContext } from '../context/UserAuth';
import { useNavigate } from "react-router-dom";
import Services from '../localStorage/Services';
import { baseUrl } from '../assets/Endpoints';
import { Toaster, toast } from 'sonner'

export default function Login() {
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const { setUserData } = useContext(UserAuthContext);

  const navigate = useNavigate();

  const handelLogin = () => {
    if (inputData.email === "" || inputData.password === "") {
      toast.warning('Please fill in both email and password');
      return;
    }

      fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputData.email,
          password: inputData.password
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json(); // Parse the JSON only if status is 200
          } else {
            throw new Error(`Failed with status: ${response.status}`);
          }
        })
        .then((data) => {
          setUserData(data);
          navigate("/");
          Services.setUser(data)
        })
        .catch((error) => console.error("Error:", error));  
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Toaster position="top-center"/>
      <div className='themeCard px-5 rounded-md py-5'>
        <h1 className='text-center text-3xl mb-4'>Login</h1>
        <Input value={inputData.email} onChange={(e) => setInputData(val => { return { ...val, email: e.target.value } })} name="Email" type="Text" />
        <Input value={inputData.password} onChange={(e) => setInputData(val => { return { ...val, password: e.target.value } })} name="Password" type="Password" />
        <div className='flex justify-center items-center mb-1'>
          <Link className='text-center cursor-pointer w-full text-sm' to="/register">Create an Account</Link>
        </div>
        <div className='flex justify-center items-center'>
          <Link className='text-center mb-3 cursor-pointer text-sm' to="/forgot-password">Forgot Password</Link>
        </div>
        <div className='flex justify-center items-center mb-3'>
          <Button onClick={() => handelLogin()} name="Login" />
        </div>
      </div>
    </div>
  );
}
