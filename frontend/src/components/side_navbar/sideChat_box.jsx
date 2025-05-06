import avatar from "../../../public/avatar.png";
import { useChatStore } from "../../store/useChatStore";

export default function SideChatBox({user}){
    const {setSelectedUser, isSelectedUser, setSelectedChat, selectedChat} = useChatStore();


    return <div className={`w-full h-[70px]  flex cursor-pointer hover:bg-gray-700
    ${selectedChat?.fullName === user.fullName ? `bg-gray-700` : `bg-black`}`} onClick={() => setSelectedChat(user)}>

        <div className="size-[64px] border-1 rounded-[100px] bg-white ml-2">
            <img src={user.profilePic || avatar}  className="size-[64px] rounded-[200px]"/>
        </div>

        <div className="lg:w-[70%] h-full  flex-col justify-center hidden md:block lg:flex">
            <h1 className="text-white ml-3">{user.fullName}</h1>
            <h5 className="text-gray-400 ml-3">Offline</h5>
        </div>
    
    </div>


}