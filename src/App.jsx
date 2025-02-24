import React, { useContext, useEffect, useState } from 'react'
import './App.css';
import { UserAuthContext } from './context/UserAuth';
import Services from './localStorage/Services';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { useNavigate } from "react-router-dom";

function App() {
  const{setUserData} = useContext(UserAuthContext);

  const navigate = useNavigate();

  useEffect(()=>{
    Services.getUser().then(res=>{
      if(res){
        setUserData(res);
        navigate("/")
      }else{
        setUserData(null);
        navigate("/login")
      }
    })
  },[])
  return (
      <>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
  )
}

export default App
