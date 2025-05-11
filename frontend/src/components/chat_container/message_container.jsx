import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore"
import { useAuthStore } from "../../store/useAuthStore";
import avatar from "../../../public/avatar.png"
import { formatMessageTime } from "../../lib/utils.";

export default function MessageContainer() {

    const {getMessages, selectedChat, messages, subscribeToMessages, unsubscribeToMessages, chatBgColor} = useChatStore();
    const {authUser, socket} = useAuthStore();

    const containerRef = useRef(null);
    console.log("bgColor:", chatBgColor);
    

    useEffect(() => {
        getMessages(selectedChat._id);

        subscribeToMessages();

        return () => unsubscribeToMessages();
        
    }, [selectedChat._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

    useEffect(() => {     
        containerRef.current?.scrollIntoView({behavior : "smooth", });
    }, [messages])


   

    

    console.log("Socket: ", socket);
    // console.log("messages: ", messages);
    // console.log("auth user: ", authUser);

    return  <div className={`w-[100%] lg-h-[500px] overflow-y-scroll  h-full  relative `} style={{backgroundColor : chatBgColor}} >

        {/* {
            showModal && <div className="w-full h-full bg-gray-100">
                <div className="size-[300px] border-1 bg-gray-300 absolute top-1/2 left-1/2 -translate-1/2
                z-100 rounded" >

                </div>
            </div>
        } */}
        
        {
           messages && messages.map((mess) => {
                return <div className={`chat ${authUser._id === mess.senderId ? "chat-end" : "chat-start"} mr-4
                ${authUser._id === mess.senderId ? "mr-4" : "ml-4"} scroll-smooth`} key={mess._id} ref={containerRef}>

                    <div className="chat-image avatar">
                        <div className="w-[48px] rounded-full">
                            <img src={authUser._id === mess.senderId ? authUser.profilePic : selectedChat.profilePic 
                                || avatar} alt="profile" />
                        </div>
                    </div>

                    <div className="chat-header mb-1">
                            {authUser._id === mess.senderId ? authUser.fullName : selectedChat.fullName}
                            <time className="text-gray-400">{formatMessageTime(mess.createdAt)}</time>
                    </div>

                    <div className="chat-bubble text-black mb-1 flex flex-col ">
                        {
                            mess.image ? <img src={mess.image} alt="some image"  className="size-[92px]"/> : null
                        }
                        
                        {mess.text}
                    </div>
                </div>
            })
        }

    </div>
}