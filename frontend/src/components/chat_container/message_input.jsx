import { FileInput, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";


export default function MessageInput () {

    const [text, setText] = useState("");
    const [imagePrev, setImagePrev] = useState(null);
    const fileInput = useRef();
    const {sendMessage} = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file.type.startsWith("image/")){
            toast.error("Only image is allowed");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImagePrev(reader.result);
        };
        reader.readAsDataURL(file);

    };

    const removeImage = () => { 

        setImagePrev(null);
        if (fileInput.current) fileInput.current.value = "";

    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePrev) return;

        
        try {
            await sendMessage({
                text : text.trim(),
                image : imagePrev,
            });


            //clear form
            setText("");
            setImagePrev(null);
            if (fileInput.current) fileInput.current.value = "";
        } catch (error) {
            console.error("Failed to send message!", error.message);
        }
    };
    
    return <div className={`w-full ${imagePrev ? "h-[160px]" : "h-[70px]"}  flex flex-col gap-5 justify-center duration-500` }>



        
        {
            imagePrev && (<div className="w-full h-[90px] flex items-center  bg-white relative">
                <X className="absolute right-0 top-0 mr-3 mt-3 cursor-pointer hover:scale-125 duration-200"
                onClick={removeImage}/>
                <img src={imagePrev} className="size-[64px] ml-4 "/>
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