import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";
import io from "socket.io-client"
import { useResponseStore } from "./useResponseStore";
import { getNickNames } from "../../../backend/src/controllers/chatNickName.controller";



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
    toSendNn : "",
    toSendNnPartner : "",

    setToSendNn : (e) => {
        set({toSendNn : e.target.value})
    },
    setToSendNnPartner : (e) => {
        set({toSendNnPartner : e.target.value})
    },

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
    setSelectedChat : async (selected) => {
        const user = useAuthStore.getState().authUser;
        const recieverId_3 = selected._id.substring(0, 6);
        const userId_3 = user._id.substring(0, 6);
        const convoId = [recieverId_3, userId_3].sort().join("");
        
        // set({toSendNn : ""});
        // set({toSendNnPartner : ""});
        set({selectedChat : selected});
        set({isSelectedUser : true});
        get().getMessages(selected._id); //this is how you can use another object funtion inside an object function (with zustand create)
        get().setInChat();
        get().getBgColor();
        get().joinConvoRoom(convoId);
        set({currentConvoRoom : convoId});
        await get().createNickName(user._id, selected._id, user.fullName, selected.fullName);
        await get().getNickNames(selected._id);
        get().setUserNickName();
        
        
    },

    setInNickNames : async () => {
        const {selectedChat} = get();
        set({inNickNames : !get().inNickNames});
        set({inNnEditModeUser : false});
        set({inNnEditModeReciever : false});
        get().getNickNames(selectedChat._id);
         
        
    },

    setInNnEditModeUser : async () => {
        const user = useAuthStore.getState().authUser;
        const {toSendNn, toSendNnPartner, selectedChat} = get();
        set({inNnEditModeUser : !get().inNnEditModeUser});
        await get().createNickName(user._id, selectedChat._id, user.fullName, selectedChat.fullName, toSendNn, toSendNnPartner);
        get().getNickNames(selectedChat._id);
        get().setUserNickName();
        
        
        
         
    },
    setInNnEditModeUser2 : () => {
        set({inNnEditModeUser : !get().inNnEditModeUser});
    },
    setinNnEditModeReciever2 : () => {
        set({inNnEditModeReciever : !get().inNnEditModeReciever});
    },

    setinNnEditModeReciever : async () => {
        const user = useAuthStore.getState().authUser;
        const {toSendNn, toSendNnPartner, selectedChat} = get();
        set({inNnEditModeReciever : !get().inNnEditModeReciever});
        await get().createNickName(user._id, selectedChat._id, user.fullName, selectedChat.fullName, toSendNn, toSendNnPartner);
        get().setUserNickName();
        get().getNickNames(selectedChat._id);
        

    },

    setInChat : () => {
        set({inChat : true});
    },

    backChat : () => {
        set({inChat : false});
        // window.location.reload();
        // set({selectedChat : null})
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
    },

    //----------------NICKNAMES STUFF------------------
    createdNickNameData : {},
    getNickNamesData : null,
    createNickName : async (userID, partnerID, userName, partnerName, userNickName, partnerNickName) => {
        
        try {

            console.log("Creating nickname for:", userID, partnerID);
            const data = {
                userId : userID, 
                partnerId : partnerID, 
                userName : userName,
                partnerName : partnerName,
                userNickName : userNickName,
                partnerNickName : partnerNickName
            };
            
            const res = await axios.post(
                `http://localhost:5001/api/chat-nickname/create-NickName`,
                 data, 
                 {withCredentials : true});
                 
            set({createdNickName : res.data});


        } catch (error) {
            console.log("Error in create nn: ", error.message);
            // toast.error("Error in Create NickName: ", error.message);
           
            
        }
    },
    getNickNames : async (partnerId) => {
        try {
            const res = await axios.get(`http://localhost:5001/api/chat-nickname/get-NickName/${partnerId}`, {withCredentials : true});
            set({getNickNamesData : res.data});
            

        } catch (error) {
            console.log("Error in getting nn: ", error.message);
            toast.error(error?.response?.data?.message);
        }
    },

    //----------------------------TEST MODE
    userNickName : "",
    partnerNickName : "",
    setUserNickName : () => {
        const {getNickNamesData} = get();

        set({userNickName : getNickNamesData.userNickName});

    },
    setUserPartnerNickName : () => {
        const {getNickNamesData} = get();

        set({ partnerNickName: getNickNamesData.partnerNickName});

    }



}))