import { ArrowLeft, CircleX, Delete, Edit, Info } from "lucide-react";
import avatar from "../../../public/avatar.png"
import MessageInput from "./message_input";
import MessageContainer from "./message_container";
import { useAuthStore } from "../../store/useAuthStore";
import { useResponseStore } from "../../store/useResponseStore";
import { useChatStore } from "../../store/useChatStore";


export default function ChatContainer({selectedUser}){


    const {inChat, setInChat, backChat} = useChatStore();
    const {onlineUsers} = useAuthStore();

    

    return <div className={`size-full flex flex-col ${inChat ? "flex" : "hidden"}`}>

        {/*Upper part*/}
        <div className="w-full h-[70px] border-1 lg:border-0  border-black flex justify-between items-center">

            <div className="flex  gap-3 items-center">
                <div className="size-[64px]  rounded-[500px] ml-3 my-auto scale-80 lg:scale-90">
                    <img src={selectedUser.profilePic || avatar}  className="size-[64px]  rounded-[500px]"/>
                </div>

                <div>

                    <h1>{selectedUser.fullName}</h1> {/*Name of selected user should be here*/}

                    <h5 className={`${onlineUsers.includes(selectedUser._id) ? "text-green-500" : "text-gray-500"}`}>
                        {
                            onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"
                        }
                    </h5>

                </div>
            </div>

            {/* <CircleX className="size-[32px] mr-4 cursor-pointer hover:scale-105"/> */}
            {/* <Info className="size-[32px] mr-4 cursor-pointer hover:scale-105"/> */}
            <div className="flex ">
                <Edit className="size-[32px] mr-2 cursor-pointer hover:scale-105"/>
                <ArrowLeft className="size-[32px] mr-4 cursor-pointer hover:scale-105" onClick={backChat}/>
            </div>
            
            
            
        </div>

        {/*Middle Part*/}
       <MessageContainer/>
    
        {/*Lower part*/}
        <MessageInput/>


    </div>
}