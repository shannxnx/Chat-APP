import { CircleX, Delete } from "lucide-react";
import avatar from "../../public/avatar.png";
import MessageInput from "./message_input";


export default function ChatContainer({selectedUser}){
    return <div className="size-full flex flex-col">

        {/*Upper part*/}
        <div className="w-full h-[70px]  border-black flex justify-between items-center">

            <div className="flex  gap-3 items-center">
                <div className="size-[64px]  rounded-[500px] ml-3 my-auto">
                    <img src={avatar || selectedUser.profilePic}  className="size-[64px]  rounded-[500px]"/>
                </div>

                <div>
                    <h1>{selectedUser.fullName}</h1> {/*Name of selected user should be here*/}
                    <h5 className="text-gray-500">Offline</h5>
                </div>
            </div>

            <CircleX className="size-[32px] mr-4 cursor-pointer hover:scale-105"/>
            
        </div>

        {/*Middle Part*/}
        <div className="w-full h-[500px] border-1">

        </div>

        {/*Lower part*/}

        <MessageInput/>


    </div>
}