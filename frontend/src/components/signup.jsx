import { FaBeer, FaEye, FaEyeSlash, FaQuestion } from 'react-icons/fa';
import axios from "axios"
import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';





const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toastStyle = {
    style : {
        background : "red",
        color : "white"
    }
}


export default function Signup(){

    const [signUpForm, setSignUpForm] = useState({fullName : "", email : "", password : ""});
    const [showPass, setShowPass] = useState("password");

    
    const {signUp, isSigningUp,} = useAuthStore();

    const validateForm = () => {
        if (!signUpForm.fullName.trim()) return toast.error("Full name is required", toastStyle);
        if (!signUpForm.email.trim()) return toast.error("Email is required", toastStyle);
        if (!emailRegex.test(signUpForm.email)) return toast.error("Invalid Email", toastStyle);
        if (!signUpForm.password) return toast.error("Password is required", toastStyle);
        if (signUpForm.password.length < 6) return toast.error("Password must be atleast 6 characters", toastStyle);

        return true;
    };

    function handleShowPass(){
        setShowPass((prev) => prev === "password" ? "text" : "password");
    }


    async function handleOnSubmit(event){
        event.preventDefault();

        const success = validateForm();

        if (success === true){
            signUp(signUpForm);
        }

    }

    async function handleLogOut(){
        try{
            // const res = await axios.post("http://localhost:5001/api/auth/logout", {}, {withCredentials : true});
            const res = await axiosInstance.post("/auth/logout");
            console.log("Logout successfully!");
        }catch(e){
            console.log("Error in logout : ", e.message);
            alern("Sign Up Error")
        }
    }

    function handleOnChange(e){
        setSignUpForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    //bg-white border-1
    //bg-[#E69DB8] border-b-

    return <div className="w-full h-screen flex flex-col items-center bg-[#F1E7E7] overflow-hidden">
        <h1 className="w-[90%] text-2xl lg:text-5xl mt-6 underline underline-offset-4 ">CHAT</h1>

        <form onSubmit={handleOnSubmit} className="lg:w-[30%] border-1 min-h-[400px] h-[450px] flex-col bg-[#E69DB8]  rounded-[20px] shadow-lg
        items-center flex w-[80%] mt-30 lg:mt-0 md:w-[50%] ">
            <h1 className="w-[100%] text-center mt-4 text-3xl ">SIGN UP</h1>

            <div className="lg:w-[70%] mt-5 flex flex-col  w-[85%]">

                <label htmlFor="" className="mb-3">Full Name</label>
                <input type="text" className="rounded p-3  h-[50px] bg-white border-1 focus:outline-none" placeholder="Full Name" 
                name='fullName' value={signUpForm.fullName} onChange={handleOnChange} autoComplete='off' required/>

            </div>
            <div className="lg:w-[70%] mt-2  flex flex-col  w-[85%]">

                <label htmlFor="" className="mb-3">Email</label>
                <input type="text" className="rounded p-3  h-[50px] bg-white border-1 focus:outline-none" placeholder="Email"
                name='email' value={signUpForm.email} onChange={handleOnChange} autoComplete='off' required/>

            </div>
            <div className="lg:w-[70%] mt-2 flex flex-col mb-8 w-[85%]">

                <label htmlFor="" className="mb-3">Password</label>

                <div className='flex relative'>
                    <input type={showPass} className="rounded p-3 w-[100%] h-[50px] bg-white border-1 focus:outline-none" placeholder="********"
                    name='password' value={signUpForm.password} onChange={handleOnChange} autoComplete='off' required/>
                    {
                        showPass === "password" ? <FaEyeSlash className='absolute text-2xl top-1/2 -translate-y-1/2 right-0 mr-3 cursor-pointer'  onClick={handleShowPass}/>
                        : <FaEye className='absolute text-2xl top-1/2 -translate-y-1/2 right-0 mr-3 cursor-pointer' onClick={handleShowPass}/>
                    }

                    
                </div>
                

            </div>


            <button type='submit' className="border-1 w-[170px] h-[40px] rounded-[500px] cursor-pointer bg-white
            hover:bg-gray-200 active:scale-95" disabled={isSigningUp}>
                {
                    isSigningUp ? (
                        <>
                            <Loader2 className='size-5 animate-spin'/>
                            Loading....
                        </>
                    ) : ("Create Account")
                }


                
            </button>

        </form>

        <h1 className='mt-4'>Already have an accont? <span className='text-[#E69DB8] underline underline-offset-4'><a href="/login">Log in</a></span></h1>


        <div className='w-[90%] h-[60px] flex justify-end items-center absolute bottom-0 mb-5'>
            <div className=' w-[60px] h-[100%] flex justify-center items-center scale-115 rounded-[500px] bg-[#FFFECE]'>
                <h1 className='text-2xl lg:text-3xl text-black cursor-pointer active:scale-95' onClick={handleLogOut}><FaQuestion/></h1>
            </div>
            
        </div>

        
        



    </div>
}