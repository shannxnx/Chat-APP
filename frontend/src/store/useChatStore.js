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
    currentConvoRoom : null,
    inNickNames : false,
    inNnEditModeUser : false,
    inNnEditModeReciever : false,

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

    joinConvoRoom : (convoId) => {
        const {selectedChat} = get();
        if (!selectedChat) return;

        const socket = useAuthStore.getState().socket;

        socket.emit("joinConvo", convoId);
    },


    setSelectedUser : (isSelectedUser) => set({isSelectedUser}),
    setSelectedChat : (selected) => {
       
        
        const user = useAuthStore.getState().authUser;
        const recieverId_3 = selected._id.substring(0, 6);
        const userId_3 = user._id.substring(0, 6);
        const convoId = [recieverId_3, userId_3].sort().join("");
        
        set({selectedChat : selected});
        set({isSelectedUser : true});
        get().getMessages(selected._id); //this is how you can use another object funtion inside an object function (with zustand create)
        get().setInChat();
        get().getBgColor();
        get().joinConvoRoom(convoId);
        set({currentConvoRoom : convoId});
        
    },

    setInNickNames : () => {
        set({inNickNames : !get().inNickNames})
    },

    setInNnEditModeUser : () => {
        set({inNnEditModeUser : !get().inNnEditModeUser})
    },

    setinNnEditModeReciever : () => {
        set({inNnEditModeReciever : !get().inNnEditModeReciever})
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
        const {selectedChat, currentConvoRoom} = get();
        // const selectedId = get().selectedChat._id;
        try {
            if (selectedChat._id || currentConvoRoom){
                const res = await axios.post(`http://localhost:5001/api/chatBg/change-ChatBg/${selectedChat._id}`, data, {withCredentials : true});
                set({ ChatBgColorData : res.data})
                set({ChatBgGet : res.data});
            }
           
        } catch (error) {
            console.log("Error in change BG color : ", error.message);
            toast.error(error?.response?.data?.message, );
            
        }
    },

    getBgColor : async () => {
        const {selectedChat} = get();

         if (!selectedChat?._id) return;

         try {
            
            const res = await axios.get(`http://localhost:5001/api/chatBg/get-ChatBg/${selectedChat._id}`, {withCredentials : true})
            set({ChatBgGet : res.data || "white"});

        } catch (error) {
            set({ChatBgGet : "white"})
            console.log("Error in fetching bgColor", error.message);
            // toast.error(error?.response?.data?.message);
            
        }
    },

    //this is for socket.io
    changeBackground : (color) => {
        const {currentConvoRoom} = get();
        const socket = useAuthStore.getState().socket;
        if (!currentConvoRoom) return ;

        //emit is the action
        socket.emit("changeBackground", {convoId : currentConvoRoom, color});
        
    },

    subscribeToBackgroundChange : () => {
        const socket = useAuthStore.getState().socket;

        socket.on("updateBackground", (color) => {
            console.log("Background updated to:", color);
            set({ChatBgGet : color});
        })

    },

    unsubscribeToBackgroundChange : () => {
        const socket = useAuthStore.getState().socket;
        socket.off("updatedBackground")
    }



}))