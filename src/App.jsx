import React, { useContext, useEffect, useState } from 'react'
import './App.css';
import { UserAuthContext } from './context/UserAuth';
import Services from './localStorage/Services';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  const{setUserData} = useContext(UserAuthContext);

  useEffect(()=>{
    Services.getUser().then(res=>{
      res ? setUserData(res) : setUserData(null);
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
