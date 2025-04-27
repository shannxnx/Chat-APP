import { FaBeer, FaQuestion } from 'react-icons/fa';

import axios from "axios"
import { useState } from 'react';

export default function Signup(){

    const [signUpForm, setSignUpForm] = useState({fullName : "", email : "", password : ""});


    async function handleOnSubmit(event){
        event.preventDefault();

        try {


            // if (!signUpForm.fullName || !signUpForm.email || !signUpForm.password){
            //     console.log("Fill out all ");
            // }

            const res = await axios.post(`http://localhost:5001/api/auth/signup`, signUpForm);
            console.log("Sign in succesfully!");

            setSignUpForm({fullName : "", email : "", password : ""});
            


        } catch (e) {
            console.log("Error in submit: ", e.message);
        }
    }

    async function handleLogOut(){
        try{
            const res = await axios.post("http://localhost:5001/api/auth/logout");
            console.log("Logout successfully!");
        }catch(e){
            console.log("Error in logout : ", e.message);
        }
    }

    function handleOnChange(e){
        setSignUpForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }


    return <div className="w-full h-screen flex flex-col items-center bg-[#F1E7E7] ">
        <h1 className="w-[90%] text-2xl lg:text-5xl mt-6 underline underline-offset-4 ">CHAT</h1>

        <form onSubmit={handleOnSubmit} className="w-[30%] border-1 min-h-[400px] h-[450px] flex-col bg-[#E69DB8] mt-5 rounded-[20px] shadow-lg
        items-center flex ">
            <h1 className="w-[100%] text-center mt-4 text-3xl ">SIGN UP</h1>

            <div className="w-[70%] mt-5 flex flex-col">

                <label htmlFor="" className="mb-3">Full Name</label>
                <input type="text" className="p-4 border-1 h-[50px] bg-white" placeholder="Full Name" 
                name='fullName' value={signUpForm.fullName} onChange={handleOnChange} autoComplete='off' required/>

            </div>
            <div className="w-[70%] mt-2  flex flex-col">

                <label htmlFor="" className="mb-3">Email</label>
                <input type="text" className="p-4 border-1 h-[50px] bg-white" placeholder="Email"
                name='email' value={signUpForm.email} onChange={handleOnChange} autoComplete='off' required/>

            </div>
            <div className="w-[70%] mt-2 flex flex-col mb-8">

                <label htmlFor="" className="mb-3">Password</label>
                <input type="password" className="p-4 border-1 h-[50px]  bg-white" placeholder="Password"
                name='password' value={signUpForm.password} onChange={handleOnChange} autoComplete='off' required/>

            </div>


            <button className="border-1 w-[150px] h-[40px] rounded-[500px] cursor-pointer bg-white
            hover:bg-gray-200 active:scale-95">SIGN UP</button>

        </form>

        <div className='w-[90%] h-[60px] flex justify-end items-center'>
            <div className=' w-[60px] h-[100%] flex justify-center items-center scale-115 rounded-[500px] bg-[#FFFECE]'>
                <h1 className='text-2xl lg:text-3xl text-black cursor-pointer active:scale-95' onClick={handleLogOut}><FaQuestion/></h1>
            </div>
            
        </div>
        



    </div>
}