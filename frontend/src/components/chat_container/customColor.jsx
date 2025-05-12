import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ColorDiv({color}){

    const {setBgColor, chatBgColor, selectedChat} = useChatStore();
    const {authUser} = useAuthStore();

    const [bgData, setBgData] = useState({});

    const handleCustomColor = (color) => {
        setBgColor(color)
    }

    async function ChangeBgColor(data) {
        try {
            if (selectedChat._id){
                const res = await axios.post(`http://localhost:5001/api/chatBg/change-ChatBg/${selectedChat._id}`, data, {withCredentials : true});
                setBgData(res.data);
            }
           
        } catch (error) {
            console.log("Error in change BG color : ", error.message);
            toast.error(error?.response?.data?.message);
            
        }
    }

    

    async function handleCustomChat(e) {
        e.preventDefault;
        const data = {chatBackground : color};
        ChangeBgColor(data);
        
    }

    console.log("bgData", bgData);

    

    
    
    

    

    

   return <div className={`size-[64px] transition-transform
   rounded cursor-pointer hover:scale-115`} style={{backgroundColor : `${color}`, opacity : 1  }}
   onClick={handleCustomChat}>

    </div>
}