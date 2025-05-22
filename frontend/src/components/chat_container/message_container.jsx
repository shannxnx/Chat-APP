import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore"
import { useAuthStore } from "../../store/useAuthStore";
import avatar from "../../../public/avatar.png"
import { formatMessageTime } from "../../lib/utils.";
import { getNickNames } from "../../../../backend/src/controllers/chatNickName.controller";

export default function MessageContainer() {

    const {getMessages, selectedChat, messages, subscribeToMessages, unsubscribeToMessages, chatBgColor,
    getNickNamesData } = useChatStore();
    const {authUser, userData} = useAuthStore();

    const containerRef = useRef(null);
    // console.log("bgColor:", chatBgColor);
    

    useEffect(() => {
        getMessages(selectedChat?._id);
        subscribeToMessages();
        return () => unsubscribeToMessages();
        
    }, [selectedChat?._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

    useEffect(() => {     
        containerRef.current?.scrollIntoView({behavior : "smooth", });
    }, [messages])


   

    

    // console.log("Socket: ", socket);
    // console.log("messages: ", messages);
    // console.log("auth user: ", userData);

    return  <div className={`w-[100%] lg-h-[500px] overflow-y-scroll  h-full  relative `}  >

        
        
        {
           messages && messages.map((mess) => {
                return <div className={`chat ${authUser._id === mess.senderId ? "chat-end" : "chat-start"} mr-4
                ${authUser._id === mess.senderId ? "mr-4" : "ml-4"} scroll-smooth`} key={mess._id} ref={containerRef}>

                    <div className="chat-image avatar">
                        <div className="w-[48px] rounded-full">

                            <img src=
                            {
                                authUser._id === mess.senderId ?
                                authUser?.profilePic ? authUser?.profilePic : avatar 
                                : selectedChat?.profilePic 
                                || avatar
                            } 
                            alt="profile" />


                        </div>
                    </div>

                    <div className="chat-header mb-1">

                            {   
                                authUser._id === mess.senderId ? 
                                getNickNamesData?.userNickName === "" ? 
                                authUser?.nickName === "" ? authUser.fullName : authUser.nickName 
                                : getNickNamesData?.userNickName

                                : getNickNamesData?.partnerNickName  === "" ?
                                selectedChat?.nickName === "" ? selectedChat?.fullName : selectedChat.nickName
                                : getNickNamesData?.partnerNickName
                            }
                            {/* {   
                                authUser._id === mess.senderId ? 
                                authUser?.nickName === "" ? authUser.fullName : authUser.nickName
                                : getNickNamesData[0]?.partnerNickname === "" ?  
                                selectedChat?.nickName === "" ? selectedChat?.fullName : selectedChat.nickName
                                : getNickNamesData[0]?.partnerNickname 
                            } */}

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