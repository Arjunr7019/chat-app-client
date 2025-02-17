import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='themeCard px-5 rounded-md py-5'>
        <h1 className='text-center text-3xl mb-4'>Login</h1>
        <Input name="Email" type="Text" />
        <Input name="Password" type="Password" />
        <div className='flex justify-center items-center mb-1'>
          <Link className='text-center cursor-pointer w-full text-sm' to="/register">Create an Account</Link>
        </div>
        <p className='text-center mb-3 cursor-pointer text-sm'>Forgot Password</p>
        <div className='flex justify-center items-center mb-3'>
          <Button name="Login"/>
        </div>
      </div>
    </div>
  );
}
