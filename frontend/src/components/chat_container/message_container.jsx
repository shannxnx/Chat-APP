import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore"
import { useAuthStore } from "../../store/useAuthStore";
import avatar from "../../../public/avatar.png"

export default function MessageContainer() {

    const {getMessages, selectedChat, messages} = useChatStore();
    const {checkAuth, authUser} = useAuthStore();

    useEffect(() => {
        getMessages(selectedChat._id);
    }, [selectedChat._id, getMessages]);

    console.log("messages: ", messages);
    console.log("auth user: ", authUser);

    return  <div className="w-full h-[500px] border-1 overflow-scroll">
        
        {
           messages && messages.map((mess) => {
                return <div className={`chat ${authUser._id === mess.senderId ? "chat-end" : "chat-start"} mr-4
                ${authUser._id === mess.senderId ? "mr-4" : "ml-4"}`}>

                    <div className="chat-image avatar">
                        <div className="w-[48px] rounded-full">
                            <img src={authUser._id === mess.senderId ? authUser.profilePic : selectedChat.profilePic 
                                || avatar} alt="profile" />
                        </div>
                    </div>

                    <div className="chat-header mb-1">
                            {authUser._id === mess.senderId ? authUser.fullName : selectedChat.fullName}
                            <time className="text-gray-400">{mess.createdAt.split("T")[0]}</time>
                    </div>

                    <div className="chat-bubble text-black mb-1">
                        {mess.text}
                    </div>
                </div>
            })
        }

    </div>
}