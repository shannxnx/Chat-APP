import { Check, Pencil, X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore"
import { useChatStore } from "../../store/useChatStore";
import avatar from "../../../public/avatar.png"

export default function AddNickname(){

    const {selectedChat, setInNickNames, inNnEditModeUser, setInNnEditModeUser, 
    inNnEditModeReciever, setinNnEditModeReciever, createdNickName, createNickName, toSendNn, setToSendNn,
    toSendNnPartner, setToSendNnPartner, getNickNamesData, setInNnEditModeUser2, setinNnEditModeReciever2,
    userNickName, partnerNickName} = useChatStore();
    const {authUser} = useAuthStore();


    // console.log("Created: ", createdNickName);   
//    console.log("Tosend NN: ", toSendNn);
//    console.log("TosendPartner NN: ", toSendNnPartner);
   console.log("userNickName : ", userNickName);
    

    return <>
    <div className="fixed inset-0 bg-black opacity-50 z-20"></div>

    <div className="lg:w-[500px] lg:h-[250px] md:w-[400px] md:h-[250px] h-[250px] w-[94%] border border-gray-300 bg-white fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        rounded-lg flex flex-col items-center shadow-l">
            
            <div className="w-[100%] flex flex-col items-center relative justify-center">
                <h1 className="text-black text-[24px] mt-3">NICKNAMES</h1>
                <div className="w-[100%]">
                    <hr />
                </div>
                <X className="absolute right-0 mr-2 size-[32px] hover:scale-105 cursor-pointer" onClick={setInNickNames}/>
            </div>


           
             {/* 
                placeholder={selectedChat.nickName === "" ? selectedChat.fullName : selectedChat.nickName}  
                placeholder={getNickNamesData.partnerNickName === "" ? selectedChat.nickName === "" ? 
                                selectedChat.fullName : selectedChat.nickName 
                                : getNickNamesData.partnerNickName} 
             */}

            <div className="w-[90%] h-[60%] mt-6 flex flex-col">
                 <div className="flex items-center items w-[100%] h-[50%] gap-3 relative">
                    <img src={selectedChat.profilePic || avatar} className="size-[64px] rounded-full" />
                    <div>
                        {
                            inNnEditModeReciever ? <input type="text" 
                            placeholder={getNickNamesData.partnerNickName === "" ? selectedChat.nickName === "" ? 
                                selectedChat.fullName : selectedChat.nickName 
                                : getNickNamesData.partnerNickName} 

                            className="text-[20px] text-black w-[90%] p-2" value={toSendNnPartner}
                            onChange={setToSendNnPartner}/> 
                            :   <h1 className="text-[20px]">
                                    {/* {selectedChat.nickName === "" ? selectedChat.fullName : selectedChat.nickName} */}
                                    {/* {
                                    toSendNnPartner === "" ? selectedChat.nickName === "" ? selectedChat.fullName : selectedChat.nickName 
                                    : toSendNnPartner} */}

                                    {   
                                        getNickNamesData.partnerNickName === "" ? selectedChat.nickName === "" ? 
                                        selectedChat.fullName : selectedChat.nickName 
                                        : getNickNamesData.partnerNickName
                                    } 

                                    {/* {
                                        partnerNickName === null ? 
                                        selectedChat.nickName === "" ? 
                                        selectedChat.fullName : selectedChat.nickName 
                                        : partnerNickName
                                    } */}
                                </h1>
                        }
                        
                        
                        {
                            inNnEditModeReciever ? null : <h6 className="text-[12px] text-gray-500">Set Nickname</h6>
                        }

                    </div>

                    {
                        inNnEditModeReciever ? <Check className="absolute right-0 cursor-pointer hover:scale-110" onClick={setinNnEditModeReciever}/> 
                        : <Pencil className="absolute right-0 cursor-pointer hover:scale-110" onClick={setinNnEditModeReciever2}/>
                    }

                    {/* <Pencil className="absolute right-0 cursor-pointer hover:scale-110"/> */}
                    
                </div>

                <div className="flex items-center items w-[100%] h-[50%]  gap-3 relative">
                    <img src={authUser.profilePic || avatar} className="size-[64px] rounded-full" />
                    <div>

                        {/* placeholder={getNickNamesData.partnerNickName === "" ? selectedChat.nickName === "" ? 
                                selectedChat.fullName : selectedChat.nickName 
                                : getNickNamesData.partnerNickName} */}
                        {
                            inNnEditModeUser ? <input type="text" 
                            placeholder={
                                getNickNamesData.userNickName === "" ? 
                                authUser.nickName === "" ? authUser.fullName : authUser.nickName
                                :  getNickNamesData.userNickName
                            } 
                            className="text-[20px] text-black lg:w-[90%] md:w-[90%] w-[85%] p-2"
                           value={toSendNn} onChange={setToSendNn}/>
                            : <h1 className="text-[20px]">
                                {/* {authUser.nickName === "" ? authUser.fullName : authUser.nickName} */}
                                {/* {toSendNn === "" ? authUser.nickName === "" ? authUser.fullName : authUser.nickName : toSendNn} */}
                                {
                                    getNickNamesData.userNickName === "" ? 
                                    authUser.nickName === "" ? authUser.fullName : authUser.nickName 
                                    :  getNickNamesData.userNickName
                                } 


                                {/* {  // still on process
                                    userNickName === "" ? 
                                    authUser.nickName === "" ? authUser.fullName : authUser.nickName 
                                    :  userNickName
                                } */}
                            </h1>
                        }


                        {/* <h1 className="text-[20px]">{authUser.fullName}</h1> */}
                        
                        {
                            inNnEditModeUser ? null : <h6 className="text-[12px] text-gray-500">Set Nickname</h6>
                        }
                        
                    </div>

                    {
                        inNnEditModeUser ? <Check className="absolute right-0 cursor-pointer hover:scale-110" onClick={setInNnEditModeUser}/> 
                        : <Pencil className="absolute right-0 cursor-pointer hover:scale-110" onClick={setInNnEditModeUser2}/>
                    }

                    


                </div>

                

            </div>



    </div>

    </>
    
}