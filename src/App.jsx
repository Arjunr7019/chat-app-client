import React from 'react'
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
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
