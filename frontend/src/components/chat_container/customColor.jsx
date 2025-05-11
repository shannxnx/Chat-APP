import { useChatStore } from "../../store/useChatStore"

export default function ColorDiv({color}){

    const {setBgColor, chatBgColor} = useChatStore();

    const handleCustomColor = (color) => {
        setBgColor(color)
    }

    

   return <div className={`size-[64px] transition-transform
   rounded cursor-pointer hover:scale-115`} style={{backgroundColor : `${color}`, opacity : 1  }}
   onClick={() => handleCustomColor(color)}>

    </div>
}