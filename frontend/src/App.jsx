import { useState } from 'react'
import Signup from './components/signup'
import { BrowserRouter, Routes, Route } from "react-router-dom";


{/* <div className=''>
        <Signup/>
</div> */}


function App() {
  

  return (
    
    <BrowserRouter>
      <Routes>
        <Route index element={<Signup/>}/>
      </Routes>
      
    </BrowserRouter>
    
    
  )
}

export default App
