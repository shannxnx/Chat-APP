import { useEffect, useState } from 'react'
import Signup from './components/signup'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import Homepage from './components/homepage';
import Profile from './components/profile';
import { Toaster } from 'react-hot-toast';

{/* <div className=''>
        <Signup/>
</div> */}


function App() {
  const {checkAuth, authUser, isCheckingAuth, onlineUsers} = useAuthStore();

  console.log("online pips: ", onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({authUser});

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen bg-[#d7caca]'>
        <Loader className='size-10 animate-spin'/>
    </div>
  )

  return (
    
    <BrowserRouter>
      <Routes>
       
        <Route path='/' element={authUser ?  <Homepage/> : <Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to="/"/>} />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/"/>}/>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login"/>}/>
        
        
      </Routes>
      <Toaster/> 
    </BrowserRouter>
    
    
  )
}

export default App
