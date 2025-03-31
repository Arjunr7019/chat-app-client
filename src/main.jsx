import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import "@fontsource/ubuntu";
import { UserAuthProvider } from './context/UserAuth'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/chat-app-client/">
      <UserAuthProvider>
        <App />
      </UserAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
