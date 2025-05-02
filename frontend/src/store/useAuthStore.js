import axios from "axios";
import {create} from "zustand";


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
    }

}))