import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore";
import Sidenav from "./sidenav";
import { ChartArea } from "lucide-react";
import chatIcon from "../../public/chat-svgrepo-com.svg";

//C:\CHAT_MERN\frontend\public\chat-svgrepo-com.svg




//68191e92f10e2a50fb5465e9 - Joe Goldberg _id



export default function Homepage(){
    const {logOut} = useAuthStore();
    const {messages, users, getMessages, getUsers, isSelectedUser} = useChatStore();
    

    useEffect(() => {
        getUsers();
        getMessages("68191e92f10e2a50fb5465e9");
    }, [])

    // console.log("Users (chat): ", users);
    // console.log("Messages : ", messages);

    return <div className="bg-[#F1E7E7] w-screen h-screen border-1 flex overflow-hidden">
        <Sidenav/>

        <div className="w-[100%] h-full  bg-white border-1">
            {
                isSelectedUser ? null 
                : <div className="size-full border-1 flex flex-col justify-center items-center">
                    <img src={chatIcon} alt="chat icon" className="size-[200px] mb-4"/>
                    <h1>Welcome to 
                        <span className="text-red-600 underline underline-offset-4 decoration-1 ml-2">ChatAss</span>
                    </h1>
                </div>

            }
        </div>

        
    </div>
}