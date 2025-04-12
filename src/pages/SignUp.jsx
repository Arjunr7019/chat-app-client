import React, { useContext, useState } from 'react';
import '../App.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { UserAuthContext } from '../context/UserAuth';
import { useNavigate } from "react-router-dom";
import Services from '../localStorage/Services';
import { baseUrl } from '../assets/Endpoints';
import { Toaster, toast } from 'sonner'

export default function SignUp() {
  const [inputData, setInputData] = useState({ name: "", email: "", gender: "", password: "" });
  const { setUserData } = useContext(UserAuthContext);

  const navigate = useNavigate();

  const handelSignUp = () => {
    if (inputData.email === "" || inputData.password === "" || inputData.gender === "" || inputData.name === "") {
          toast.warning('Please fill in both all the inputs');
          return;
        }

    fetch(`${baseUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:inputData.name,
        email:inputData.email,
        gender:inputData.gender,
        password:inputData.password
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
        Services.setUser(data);
      })
      .catch((error) => console.error("Error:", error));
  };


  return (
    <div className='flex justify-center items-center h-screen'>
      <Toaster position="top-center"/>
      <div className='themeCard px-5 rounded-md py-5'>
        <h1 className='text-center text-3xl mb-4'>SignUp</h1>
        <Input value={inputData.name} onChange={(e) => setInputData(val => { return { ...val, name: e.target.value } })} name="Name" type="Text" />
        <Input value={inputData.email} onChange={(e) => setInputData(val => { return { ...val, email: e.target.value } })} name="Email" type="Text" />
        <Input value={inputData.gender} onChange={(e) => setInputData(val => { return { ...val, gender: e.target.value } })} name="Gender" type="Text" />
        <Input value={inputData.password} onChange={(e) => setInputData(val => { return { ...val, password: e.target.value } })} name="Password" type="Password" />
        <div className='flex justify-center items-center mb-3'>
          <Link className='text-center cursor-pointer w-full text-sm' to="/login">Already have an Account</Link>
        </div>
        <div className='flex justify-center items-center mb-3'>
          <Button onClick={() => handelSignUp()} name="Sign Up" />
        </div>
      </div>
    </div>
  )
}
