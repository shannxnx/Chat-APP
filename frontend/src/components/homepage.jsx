import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore";
import Sidenav from "./side_navbar/sidenav";
import { ChartArea } from "lucide-react";
import chatIcon from "../../public/chat-svgrepo-com.svg";
import ChatContainer from "./chat_container/chat_container";






//68191e92f10e2a50fb5465e9 - Joe Goldberg _id



export default function Homepage(){
    const {logOut} = useAuthStore();
    const {messages, users, getMessages, getUsers, isSelectedUser, selectedChat} = useChatStore();
    

    useEffect(() => {
        getUsers();
    }, []);

    // console.log("Selected Chat: ", selectedChat);
    console.log("Messages: ", messages);
    

    return <div className="bg-[#F1E7E7] w-screen h-screen  flex overflow-hidden">
        <Sidenav/>
        
        <div className="w-[100%] h-full  bg-white ">
            {
                isSelectedUser ? <ChatContainer selectedUser={selectedChat}/>
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