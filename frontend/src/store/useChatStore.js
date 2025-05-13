import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import io from "socket.io-client"
import { useResponseStore } from "./useResponseStore";



export const useChatStore = create((set, get) => ({
    messages : [],
    users : [],
    isSelectedUser : null,
    isUserLoading : false,
    isMessagesLoading : false,
    selectedChat : null,
    inChat : false,
    showModal : false,
    chatBgColor : "",
    ChatBgColorData : null,
    ChatBgGet : null,

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
            toast.error(error.response.data.message || "Failed to fetch message");
        }finally{
            set({isMessagesLoading : false});
        }
    },

    sendMessage : async (messageData) => {
        const {isSelectedUser, messages, selectedChat} = get();

        try {
            
            const res = await axios.post(`http://localhost:5001/api/message/send/${selectedChat._id}`, messageData, {withCredentials : true});
            set({messages: [...messages, res.data]});

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages : () => {
        const {selectedChat} = get();
        if (!selectedChat) return;

        const socket = useAuthStore.getState().socket; 

        
        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedChat._id)return;
            set({messages : [...get().messages, newMessage]});
        });

    },

    unsubscribeToMessages : () => {
        const socket = useAuthStore.getState().socket; 
        socket.off("newMessage");
    },



    setSelectedUser : (isSelectedUser) => set({isSelectedUser}),
    setSelectedChat : (selected) => {
       
        set({selectedChat : selected});
        set({isSelectedUser : true});
        get().getMessages(selected._id); //this is how you can use another object funtion inside an object function (with zustand create)
        get().setInChat();
        get().getBgColor();
        
    },

    setInChat : () => {
        set({inChat : true});
    },

    backChat : () => {
        set({inChat : false});
    },

    setModal : () => {
        set({showModal : !get().showModal})
    },

    setBgColor : (color) => {
        set({chatBgColor : color});
        get().setModal();
    },

    
    ChangeBgColor : async (data) => {
        const {selectedChat} = get();
        // const selectedId = get().selectedChat._id;
        try {
            if (selectedChat._id){
                const res = await axios.post(`http://localhost:5001/api/chatBg/change-ChatBg/${selectedChat._id}`, data, {withCredentials : true});
                set({ ChatBgColorData : res.data})
                // set({ChatBgGet : res.data});
            }
           
        } catch (error) {
            console.log("Error in change BG color : ", error.message);
            toast.error(error?.response?.data?.message, );
            
        }
    },

    getBgColor : async () => {
        const {selectedChat} = get();
         try {
            
            if (selectedChat._id){
                const res = await axios.get(`http://localhost:5001/api/chatBg/get-ChatBg/${selectedChat._id}`, {withCredentials : true})
                set({ChatBgGet : res?.data || "white"});
            }else{
                return;
            }
            
            

        } catch (error) {
            console.log("Error in fetching bgColor", error.message);
            toast.error(error?.response?.data?.message);
            
        }
    }

}))