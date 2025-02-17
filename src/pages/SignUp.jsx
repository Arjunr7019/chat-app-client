import React from 'react';
import '../App.css';
import Input from '../components/Input';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function SignUp() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='themeCard px-5 rounded-md py-5'>
        <h1 className='text-center text-3xl mb-4'>SignUp</h1>
        <Input name="Email" type="Text" />
        <Input name="Gender" type="Text" />
        <Input name="Password" type="Password" />
        <div className='flex justify-center items-center mb-3'>
          <Link className='text-center cursor-pointer w-full text-sm' to="/login">Already have an Account</Link>
        </div>
        <div className='flex justify-center items-center mb-3'>
          <Button name="Sign Up"/>
        </div>
      </div>
    </div>
  )
}
