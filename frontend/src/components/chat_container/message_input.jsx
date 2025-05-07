import { FileInput, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";


export default function MessageInput () {

    const [text, setText] = useState("");
    const [imagePrev, setImagePrev] = useState(false);
    const fileInput = useRef();
    const {sendMessage} = useChatStore();

    const handleImageChange = (e) => {

    };

    const removeImage = () => {

    };

    const handleSendMessage = () => {

    };
    
    return <div className={`w-full ${imagePrev ? "h-[160px]" : "h-[70px]"}  flex flex-col gap-5 justify-center` }>



        
        {
            imagePrev && (<div className="w-full h-[90px]  bg-gray-300">

            </div>)
        } 
        


        <form className="w-full h-[70px] flex p-2 gap-5 justify-center">
            <input type="text" className="w-[80%] h-full border-1 rounded-3xl p-3 overflow-scroll"
            placeholder="Type your message..." value={text} onChange={(e) => setText(e.target.value)}/>

            <div className="flex items-center justify-center gap-5">

                <input type="file" accept="image/*" className="hidden" ref={fileInput} onChange={handleImageChange}/>
                <button type="button" className="size-[32px] cursor-pointer hover:scale-110"
                onClick={() => fileInput.current?.click()}>
                    <FileInput className="size-[32px] cursor-pointer hover:scale-110"/>
                </button>


                <button type="submit" className="btn  bg-gray-300 btn-lg accent-red-300 " onClick={handleSendMessage}
                disabled={!text.trim() && !imagePrev}>
                    <Send size={32} className="cursor-pointer hover:scale-110"/>
                </button>

                
                
            </div>

            {/* <button type="submit" className="btn btn-sm btn-circle" onClick={handleSendMessage}
            disabled={!text.trim() && !imagePrev}>
                    <Send size={32} className="cursor-pointer hover:scale-110"/>
            </button> */}

        </form>
        

    </div>  
}