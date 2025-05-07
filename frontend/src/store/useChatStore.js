import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useChatStore = create((set) => ({
    messages : [],
    users : [],
    isSelectedUser : null,
    isUserLoading : false,
    isMessagesLoading : false,



    getUsers : async () => {
        set({isUserLoading : true})
        try {
            const res = await axios.get("http://localhost:5001/api/message/users", {withCredentials : true});
            set({users : res.data});
            
        } catch (error) {
            console.log("Error in getting users (chat) : ", error.message);
            toast.error(error.response.data.message);
        }finally{
            set({isUserLoading : false});
        }
    },

    getMessages : async (userId) => {
        set({isMessagesLoading : true});
        try {
            
            const res = await axios.get(`http://localhost:5001/api/message/${userId}`, {withCredentials : true});
            set({messages : res.data});
        } catch (error) {
            console.log("Error in getting users (chat) : ", error.message);
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading : false});
        }
    },

    sendMessage : async (data) => {

    },

    setSelectedUser : (isSelectedUser) => set({isSelectedUser : true}),

    selectedChat : null,
    setSelectedChat : (selected) => {
        set({selectedChat : selected});
        set({isSelectedUser : true});
    },

}))