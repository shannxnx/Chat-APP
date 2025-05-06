import { FileInput, Send } from "lucide-react";


export default function MessageInput () {

    

    return <div className="w-full h-[70px]  flex p-2 gap-5 justify-center">

        <input type="text" className="w-[80%] h-full border-1 rounded-3xl p-3 overflow-scroll"
        placeholder="Type your message..."/>

        <div className="flex items-center justify-center gap-5">
            <Send className="size-[32px] cursor-pointer hover:scale-110"/>
            <FileInput className="size-[32px] cursor-pointer hover:scale-110"/>
        </div>

    </div>  
}