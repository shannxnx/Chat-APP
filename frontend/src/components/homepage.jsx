import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore";
import Sidenav from "./side_navbar/sidenav";
import { ChartArea, X } from "lucide-react";
import chatIcon from "../../public/chat-svgrepo-com.svg";
import ChatContainer from "./chat_container/chat_container";
import { Colors } from "../lib/colorCustomize";
import ColorDiv from "./chat_container/customColor";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import ChangeBgModal from "./modals/backround_chat";
import AddNickname from "./modals/nicknames";






//68191e92f10e2a50fb5465e9 - Joe Goldberg _id



export default function Homepage(){
    const {logOut} = useAuthStore();
    const {getUsers, isSelectedUser, selectedChat, showModal, setModal, inNickNames, createdNickName} = useChatStore();
    const [bgCol, setBgCol] = useState({});

    async function fetchbgColor(){
        try {
            
            if (selectedChat._id){
                const res = await axios.get(`http://localhost:5001/api/chatBg/get-ChatBg/${selectedChat._id}`, {withCredentials : true})
                setBgCol(res.data);
            }else{
                return;
            }
            
            

        } catch (error) {
            console.log("Error in fetching bgColor", error.message);
            // toast.error(error?.response?.data?.message);
            
        }
    }

    useEffect(() => {
        getUsers();
        fetchbgColor();
    }, [selectedChat]);

    
    // console.log("bgCol : ", bgCol);
    // console.log("selectedChat : ", selectedChat);
    // console.log("Created: ", createdNickName);
    
    

    return <div className="bg-[#F1E7E7] w-screen h-screen  flex overflow-hidden">
        

        { showModal && <ChangeBgModal/>}
        { inNickNames && <AddNickname/> }
        

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