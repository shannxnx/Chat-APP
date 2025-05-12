import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore"

export default function ColorDiv({color}){

    const {setBgColor, chatBgColor} = useChatStore();
    const {selectedChat, authUser} = useAuthStore();

    const handleCustomColor = (color) => {
        setBgColor(color)
    }

    async function ChangeBgColor(params) {
        
    }

    async function handleCustomChat(e) {
        e.preventDefault;
        
    }

    

    

   return <form className={`size-[64px] transition-transform
   rounded cursor-pointer hover:scale-115`} style={{backgroundColor : `${color}`, opacity : 1  }}
   onSubmit={handleCustomChat}>

    </form>
}