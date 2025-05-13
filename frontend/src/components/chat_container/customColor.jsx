import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ColorDiv({color}){

    const {setBgColor,  ChangeBgColor, ChatBgColorData} = useChatStore();
    const {authUser} = useAuthStore();

    const [bgData, setBgData] = useState({});

    const handleCustomColor = (color) => {
        setBgColor(color)
    }

   

    

    async function handleCustomChat(e) {
        e.preventDefault;
        const data = {chatBackground : color};
        ChangeBgColor(data);
        
    }

    console.log("ChangeBgColorData", ChatBgColorData);    

    

    

   return <div className={`size-[64px] transition-transform
   rounded cursor-pointer hover:scale-115`} style={{backgroundColor : `${color}`, opacity : 1  }}
   onClick={handleCustomChat}>

    </div>
}