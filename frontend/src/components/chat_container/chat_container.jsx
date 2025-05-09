import { CircleX, Delete } from "lucide-react";
import avatar from "../../../public/avatar.png"
import MessageInput from "./message_input";
import MessageContainer from "./message_container";
import { useAuthStore } from "../../store/useAuthStore";


export default function ChatContainer({selectedUser}){

    const {onlineUsers} = useAuthStore();

    return <div className="size-full flex flex-col">

        {/*Upper part*/}
        <div className="w-full h-[70px]  border-black flex justify-between items-center">

            <div className="flex  gap-3 items-center">
                <div className="size-[64px]  rounded-[500px] ml-3 my-auto">
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

            <CircleX className="size-[32px] mr-4 cursor-pointer hover:scale-105"/>
            
        </div>

        {/*Middle Part*/}
       <MessageContainer/>
    
        {/*Lower part*/}
        <MessageInput/>


    </div>
}