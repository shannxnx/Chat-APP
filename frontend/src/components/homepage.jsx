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






//68191e92f10e2a50fb5465e9 - Joe Goldberg _id



export default function Homepage(){
    const {logOut} = useAuthStore();
    const {messages, users, getMessages, getUsers, isSelectedUser, selectedChat, showModal, setModal} = useChatStore();
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

    // console.log("Selected Chat: ", selectedChat);
    // console.log("Messages: ", messages);
    console.log("bgCol : ", bgCol);
    
    
    

    return <div className="bg-[#F1E7E7] w-screen h-screen  flex overflow-hidden">
        {/* {
            showModal && <div className="size-full bg-black absolute z-100 " style={{backgroundColor : "rgba(0, 0, 0, 0.5)"}}>
                <div className="lg:size-[400px] md:size-[400px] size-[300px] border-1 bg-white absolute top-1/2 left-1/2 -translate-1/2
                 rounded flex flex-col  items-center" >
                    <X className="absolute right-0 mr-3 mt-3 size-[32px] cursor-pointer hover:scale-110" onClick={setModal}/>

                    <h1 className="mt-10 ml-3 ">Customize your chat</h1>

                    <div className="size-[90%]  m-5 grid grid-cols-4 items-center place-items-center">

                        {
                            Colors.map((color, index) => <ColorDiv color={color} key={index}/>)
                        }
                        

                    </div>

                </div>
            </div>
        } */}

        { showModal && (
                <>
                {/* Overlay */}
                <div className="fixed inset-0 bg-black opacity-50 z-20"></div>

                {/* Modal */}
                <form
                    className="lg:w-[400px] md:w-[400px] w-[300px] border border-gray-300 bg-white fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                rounded-lg flex flex-col items-center shadow-lg"
                >
                   <button>
                    <X
                    className="absolute right-3 top-3 w-8 h-8 cursor-pointer hover:scale-110"
                    onClick={setModal}
                    />  
                    </button> 

                    <h1 className="mt-10 ml-3 text-red-600">Customize your chat</h1>

                    <div className="w-[90%] m-5 grid grid-cols-4 gap-3 place-items-center">
                        {Colors.map((color, index) => (
                            <ColorDiv color={color} key={index} />
                        ))}
                    </div>

                </form>
                </>
        )}


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