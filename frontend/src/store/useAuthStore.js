import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand";
import {io} from "socket.io-client";
import { axiosInstance } from "../lib/axios";

const toastStyle = {
    style : {
        background : "red",
        color : "white"
    }
}

/*
    null = if it's data (right)
    {} = kinda wrong    (bad but not that bad)
*/

// const BASE_URL = "http://localhost:5001";
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";


export const useAuthStore = create((set, get) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,
    userData : {},
    allUsers : {},
    isSelectedAuth : null,
    onlineUsers : [],
    socket : null,
    
    


    checkAuth : async () => {
        try {
            // const res = await axios.get("http://localhost:5001/api/auth/check", {withCredentials : true});

            const res = await axiosInstance.get("/auth/check");

            set({authUser:res.data});
            get().connectSocket();

        } catch (error) {
            console.log("Error in checkauths: ", error)
            set({authUser:null});
        }finally{
            set({isCheckingAuth : false})
        }
    },

    signUp : async (data) => {

        set({isSigningUp : true});
        try {
            // const res = await axios.post("http://localhost:5001/api/auth/signup", data, {withCredentials : true});
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser : res.data});
            toast.success("Account created successfully!");
            get().connectSocket();

        } catch (error) {
            console.log("Error in signing up");
            toast.error(error.response.data.message, toastStyle);
        }finally{
            set({isSigningUp : false})
        }
    },

    logIn : async (data) => {
        set({isLoggingIn : true});
        set({isSelectedAuth : false});
        try{
            // const res = await axios.post("http://localhost:5001/api/auth/login", data, {withCredentials : true});
            
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser : res.data});
            await get().checkAuth();
            toast.success("Logged in successfully!");
            get().connectSocket();
            
        }catch(error){
            console.log("Error in logging in")
            toast.error(error.response.data.message, toastStyle);
        }finally{
            set({isLoggingIn : false});
        }
    },

    logOut : async () => {
        try {
            // await axios.post("http://localhost:5001/api/auth/logout", {}, {withCredentials: true});

            const res = await axiosInstance.post("/auth/logout");
            set({authUser : null});
            toast.success("Logged out successfully");
            get().disconnectSocket();
            window.location.reload();
        } catch (error) {
            console.log("Error in logging out")
            toast.error(error.response.data.message, toastStyle);
        }
    },

    userInfo : async () => {
        try {
            // const res = await axios.get("http://localhost:5001/api/auth/userInfo", {withCredentials: true});
            const res = await axiosInstance.get("/auth/userInfo");
            set({userData : res});
        } catch (error) {
            console.log("Error in getting user info")
            toast.error(error.response.data.message, toastStyle)
        }
    },

    updateProfile : async (data) => {
        set({isUpdatingProfile : true});

        try {
            // const res = await axios.put("http://localhost:5001/api/auth/update-profile", data, {withCredentials : true});
            const res = await axiosInstance.put("/auth/update-profile", data);

            set({userData : res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile")
            toast.error(error.response.data.message, toastStyle);
        }finally{
            set({isUpdatingProfile:false})
        }
    },

    setAllUsers : async () => {
        try {
            
            // const res = await axios.get("http://localhost:5001/api/auth/all-users", {withCredentials : true});
            const res = await axiosInstance.get("/auth/all-users");
            set({allUsers : res.data});

        } catch (error) {
            console.log("Error in getting all users: ", error);
            toast.error(error.response.data.message, toastStyle);
        }
    },

    connectSocket : () => {
        const {authUser} = get();
        if (!authUser || get().socket?.connected) return;



        const socket = io(BASE_URL, {
            query : {
                userId : authUser._id,
            },
            
        });
        socket.connect();
        set({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers : userIds});
        })
    },
    disconnectSocket : () => {
        if (get().socket?.connected) get().socket.disconnect();
    },






}))