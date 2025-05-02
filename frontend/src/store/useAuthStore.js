import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand";

const toastStyle = {
    style : {
        background : "red",
        color : "white"
    }
}


export const useAuthStore = create((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,

    checkAuth : async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/auth/check");

            set({authUser:res.data});

        } catch (error) {
            console.log("Error in checkauth: ", error)
            set({authUser:null});
        }finally{
            set({isCheckingAuth : false})
        }
    },

    signUp : async (data) => {

        set({isSigningUp : true});
        try {
            const res = await axios.post("http://localhost:5001/api/auth/signup", data);
            set({authUser : res.data});
            toast.success("Account created successfully!");

        } catch (error) {
            toast.error(error.response.data.message, toastStyle);
        }finally{
            set({isSigningUp : false})
        }
    },

    logIn : async (data) => {
        set({isLoggingIn : true});
        try{
            const res = await axios.post("http://localhost:5001/api/auth/login", data);
            set({authUser : res.data});
            toast.success("Logged in successfully!");
        }catch(error){
            toast.error(error.response.data.message, toastStyle);
        }finally{
            set({isLoggingIn : false});
        }
    },

    logOut : async () => {
        try {
            await axios.post("http://localhost:5001/api/auth/logout");
            set({authUser : null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message, toastStyle);
        }
    }





}))