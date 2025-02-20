import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const[inputData,setInputData] = useState({email:"",password:""});

  const handelLogin = () => {
    fetch("https://chat-app-server-0lgm.onrender.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: inputData
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='themeCard px-5 rounded-md py-5'>
        <h1 className='text-center text-3xl mb-4'>Login</h1>
        <Input value={inputData.email} onChange={(e)=> setInputData(val=>{return{...val, email:e.target.value}})} name="Email" type="Text" />
        <Input value={inputData.password} onChange={(e)=> setInputData(val=>{return{...val, password:e.target.value}})} name="Password" type="Password" />
        <div className='flex justify-center items-center mb-1'>
          <Link className='text-center cursor-pointer w-full text-sm' to="/register">Create an Account</Link>
        </div>
        <p className='text-center mb-3 cursor-pointer text-sm'>Forgot Password</p>
        <div className='flex justify-center items-center mb-3'>
          <Button onClick={()=> handelLogin()} name="Login"/>
        </div>
      </div>
    </div>
  );
}
