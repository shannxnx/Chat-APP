import { ArrowLeft, CircleX, Delete, Edit, Info, Pencil } from "lucide-react";
import avatar from "../../../public/avatar.png"
import MessageInput from "./message_input";
import MessageContainer from "./message_container";
import { useAuthStore } from "../../store/useAuthStore";
import { useResponseStore } from "../../store/useResponseStore";
import { useChatStore } from "../../store/useChatStore";
import { useEffect, useState } from "react";


export default function ChatContainer({selectedUser}){


    const {inChat,  backChat,  setModal, chatBgColor, ChatBgColorData, getBgColor,  ChatBgGet, selectedChat, 
    currentConvoRoom, subscribeToBackgroundChange, unsubscribeToBackgroundChange, 
    setInNickNames, createdNickNameData, createNickName, getNickNamesData, subscribeToChangeNn, unsubscribeToChangeNn} = useChatStore();
    const {onlineUsers, authUser} = useAuthStore();

        

    useEffect(() => {
        getBgColor();
        subscribeToBackgroundChange();
        return () => unsubscribeToBackgroundChange();


    }, [selectedChat, ChatBgGet?.backgroundColor, ChatBgColorData]);

    useEffect(() => {
        subscribeToChangeNn();

        return () => unsubscribeToChangeNn();
    }, [selectedChat, getNickNamesData]);


    // console.log("chatBG: ",  ChatBgGet?.backgroundColor);
    // console.log("currentConvoRoom : ", currentConvoRoom);
    // console.log("Nicknames (get): ", getNickNamesData)
    

    return <div className={`size-full flex flex-col ${inChat ? "flex" : "hidden"} `} style={{backgroundColor : ChatBgGet?.backgroundColor ? 
        ChatBgGet?.backgroundColor : "white"
    }} >

        {/*Upper part*/}
        <div className="w-full h-[70px] border-b-1 z-10 lg:border-0  border-black flex justify-between items-center" style={{backgroundColor:chatBgColor}}>

            <div className="flex  gap-3 items-center">
                <div className="size-[64px]  rounded-[500px] ml-3 my-auto scale-80 lg:scale-90">
                    <img src={selectedUser?.profilePic || avatar}  className="size-[64px]  rounded-[500px]"/>
                </div>

                <div>

                    {
                        getNickNamesData === null ? 
                        selectedUser?.nickName === "" ?  <h1>{selectedUser?.fullName }</h1> : <h1>{ selectedUser?.nickName}</h1> 
                        :getNickNamesData?.partnerNickName === "" ?  <h1>{getNickNamesData?.partnerName }</h1> 
                        : <h1>{ getNickNamesData?.partnerNickName}</h1>
                    }
                     
                     {/*For array returns*/}
                    {/* { /
                        getNickNamesData === null ? 
                        selectedUser?.nickName === "" ?  <h1>{selectedUser?.fullName }</h1> : <h1>{ selectedUser?.nickName}</h1> :
                        getNickNamesData[0]?.partnerNickName === "" ?  <h1>{getNickNamesData[0]?.partnerName }</h1> 
                        : <h1>{ getNickNamesData[0]?.partnerNickName}</h1>
                    } */}

                    {/* {
                         selectedUser?.nickName === "" ?  <h1>{selectedUser?.fullName }</h1> : <h1>{ selectedUser?.nickName}</h1>
                    }     */}
                        
                    
                    {/* {
                        getNickNamesData[0]?.partnerNickName === "" ?  <h1>{getNickNamesData[0]?.partnerName }</h1> 
                        : <h1>{ getNickNamesData[0]?.partnerNickName}</h1>
                    } */}

                    

                    <h5 className={`${onlineUsers.includes(selectedUser?._id) ? "text-green-500" : "text-gray-500"}`}>
                        {
                            onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"
                        }
                    </h5>

                </div>
            </div>

            {/* <CircleX className="size-[32px] mr-4 cursor-pointer hover:scale-105"/> */}
            {/* <Info className="size-[32px] mr-4 cursor-pointer hover:scale-105"/> */}
            <div className="flex ">
                <Pencil className="size-[32px] mr-2 cursor-pointer hover:scale-105" onClick={setInNickNames}/>
                <Edit className="size-[32px] mr-2 cursor-pointer hover:scale-105" onClick={setModal}/>
                <ArrowLeft className="size-[32px] mr-4 cursor-pointer hover:scale-105" onClick={backChat}/>
            </div>
            
            
            
        </div>

        {/*Middle Part*/}
       <MessageContainer/>
    
        {/*Lower part*/}
        <MessageInput/>


    </div>
}