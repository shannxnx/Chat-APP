import { FaBeer, FaEye, FaEyeSlash, FaQuestion } from 'react-icons/fa';

import axios from "axios"
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

export default function Login(){

    const [loginForm, setLoginForm] = useState({email : "", password : ""});
    const [showPass, setShowPass] = useState("password");

    const {logIn} = useAuthStore();
    

    function handleShowPass(){
        setShowPass((prev) => prev === "password" ? "text" : "password");
    }



    
    function handleOnChange(e){
        setLoginForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }


    async function handleOnSubmit(event){
        event.preventDefault();

        
        logIn(loginForm);
        // try {


        //     // if (!signUpForm.fullName || !signUpForm.email || !signUpForm.password){
        //     //     console.log("Fill out all ");
        //     // }

        //     const res = await axios.post(`http://localhost:5001/api/auth/login`, loginForm, {withCredentials : true});
        //     console.log("Login succesfully!");
        //     alert("Login Succesfully!");
        //     setLoginForm({email : "", password : ""});
            


        // } catch (e) {
        //     console.log("Login error: ", e.message);
        //     // alert("Login Failed");
        // }
    }

    async function handleLogOut(){
        try{
            const res = await axios.post("http://localhost:5001/api/auth/logout", {}, { withCredentials: true });
            console.log("Logout successfully!");
        }catch(e){
            console.log("Error in logout : ", e.message);
        }
    }

    
    //bg-white border-1
    //bg-[#E69DB8] border-b-

    return <div className="w-full h-screen flex flex-col items-center bg-[#F1E7E7] ">
        <h1 className="w-[90%] text-2xl lg:text-5xl mt-6 underline underline-offset-4 ">CHAT</h1>

        <form onSubmit={handleOnSubmit} className="w-[30%] border-1 min-h-[350px] h-[350px] flex-col bg-[#E69DB8]  rounded-[20px] shadow-lg
        items-center flex justify-center mt-16">
            <h1 className="w-[100%] text-center mt-4 text-3xl ">LOG IN</h1>

        
            <div className="w-[70%] mt-2  flex flex-col">

                <label htmlFor="" className="mb-3">Email</label>
                <input type="text" className="rounded p-3  h-[50px] bg-white border-1 focus:outline-none" placeholder="Email"
                name='email' value={loginForm.email} onChange={handleOnChange} autoComplete='off' required/>

            </div>
            <div className="w-[70%] mt-2 flex flex-col mb-8">

                <label htmlFor="" className="mb-3">Password</label>

                {/* <input type="password" className="p-3 h-[50px] bg-white border-1 focus:outline-none" placeholder="Password"
                name='password' value={loginForm.password} onChange={handleOnChange} autoComplete='off' required/> */}

                    <div className='flex relative'>
                        <input type={showPass} className="rounded p-3 w-[100%] h-[50px] bg-white border-1 focus:outline-none" placeholder="********"
                        name='password' value={loginForm.password} onChange={handleOnChange} autoComplete='off' required/>

                        {
                            showPass === "password" ? <FaEyeSlash className='absolute text-2xl top-1/2 -translate-y-1/2 right-0 mr-3 cursor-pointer'  onClick={handleShowPass}/>
                            : <FaEye className='absolute text-2xl top-1/2 -translate-y-1/2 right-0 mr-3 cursor-pointer' onClick={handleShowPass}/>
                        }

                        


                      
                    </div>

            </div>


            <button type='submit' className="border-1 w-[150px] h-[40px] rounded-[500px] cursor-pointer bg-white
            hover:bg-gray-200 active:scale-95">LOG IN</button>

        </form>

        <h1 className='mt-8'>Don't have an account? <span className='text-[#E69DB8] underline underline-offset-4'><a href="/signup">Sign Up</a></span></h1>

        <div className='w-[90%] h-[60px] flex justify-end items-center'>
            <div className=' w-[60px] h-[100%] flex justify-center items-center scale-115 rounded-[500px] bg-[#FFFECE]'>
                <h1 className='text-2xl lg:text-3xl text-black cursor-pointer active:scale-95' onClick={handleLogOut}><FaQuestion/></h1>
            </div>
            
        </div>
        



    </div>
}