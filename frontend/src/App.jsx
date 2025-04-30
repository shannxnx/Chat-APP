import { useState } from 'react'
import Signup from './components/signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';


{/* <div className=''>
        <Signup/>
</div> */}


function App() {
  

  return (
    
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </BrowserRouter>
    
    
  )
}

export default App
