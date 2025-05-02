import { useEffect, useState } from 'react'
import Signup from './components/signup'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import Homepage from './components/homepage';
import Profile from './components/profile';


{/* <div className=''>
        <Signup/>
</div> */}


function App() {
  const {checkAuth, authUser, isCheckingAuth} = useAuthStore();

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
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login"/>}/>
      </Routes>
      
    </BrowserRouter>
    
    
  )
}

export default App
