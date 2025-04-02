import React, { useContext, useEffect, useState } from 'react'
import './App.css';
import { UserAuthContext } from './context/UserAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import { baseUrl } from './assets/Endpoints';
import { ripples } from 'ldrs'
import { ChatContextProvider } from './context/ChatContext';

function App() {
  const { user } = useContext(UserAuthContext);
  const [serverUp, setServerUp] = useState(false);

  // const navigate = useNavigate();
  ripples.register()

  useEffect(() => {
    fetch(`${baseUrl}`).then((response) => {
      if (response.status === 200) {
        return response.json(); // Parse the JSON only if status is 200
      } else {
        throw new Error(`Failed with status: ${response.status}`);
      }
    }).then((data) => {
      setServerUp(true);
      // console.log("serverUp")
    }).catch(err => {
      console.log("error:", err);
      setServerUp(false)
    })
  }, [])


  return (
    <ChatContextProvider user={user}>
      {serverUp ? <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes> :
        <div className='h-screen flex justify-center items-center'>
          <l-ripples
            size="45"
            speed="2"
            color="black"
          ></l-ripples>
          <h1>Waiting for Server</h1>
        </div>
      }
    </ChatContextProvider>
  )
}

export default App
