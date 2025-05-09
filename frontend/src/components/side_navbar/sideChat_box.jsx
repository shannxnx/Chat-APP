import avatar from "../../../public/avatar.png";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

export default function SideChatBox({user}){
    const {setSelectedChat, selectedChat} = useChatStore();
    const {onlineUsers} = useAuthStore();


    return <div className={`w-full h-[70px]  flex cursor-pointer hover:bg-gray-700
    ${selectedChat?.fullName === user.fullName ? `bg-gray-700` : `bg-black`}`} onClick={() => setSelectedChat(user)}>

        <div className="size-[64px] border-1 rounded-[100px] bg-white ml-2">
            <img src={user.profilePic || avatar}  className="size-[64px] rounded-[200px]"/>
        </div>

        <div className="lg:w-[70%] h-full  flex-col justify-center hidden md:block lg:flex">
            <h1 className="text-white ml-3">{user.fullName}</h1>
            <h5 
        className={`${onlineUsers.includes(user._id) ? "text-green-500" : "text-gray-400 "} ml-3`}>
                {
                    onlineUsers.includes(user._id) ? "Online" : "Offline"
                }
                
            </h5>
        </div>
    
    </div>


}