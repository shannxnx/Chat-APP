import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { ArrowBigLeft, Camera, Mail, SendToBack, User } from "lucide-react";


export default function Profile(){

    const {userInfo, userData, isUpdatingProfile, updateProfile} = useAuthStore();

    useEffect(() => {
        userInfo()
    }, []);

    console.log(userData.data);

    const handleImageUpload = async (e) => {

    }

    return <div className="bg-[#F1E7E7] h-screen flex flex-col justify-center items-center relative gap-4">
        <div className="w-[100%] h-[50px] bg-black absolute top-0 flex items-center p-3">
            <a href="/">
                <ArrowBigLeft className="text-white size-[32px] cursor-pointer active:scale-95"/>
            </a>
            
        </div>

        {/*
            light blue - #090088
            dark blue - #0B192C
        */}
        
        <div className="w-[500px] h-[250px] border-1 p-4 rounded-[24px] flex gap-4 bg-[#0B192C]">

            <div className="size-[200px] border-1 rounded-[500px] bg-white relative">

                <div className="border-1 size-[48px] flex justify-center items-center absolute 
                right-0 bottom-0 mr-3 bg-black rounded-[500px] cursor-pointer">
                    <Camera className="text-white"/>
                </div>
            </div>

            {
                userData.data ? <div className="w-[50%] flex flex-col gap-4 ml-4">
                    <div className="flex gap-2">
                        <User className="text-white"/> 
                        <label className="text-white">Full Name</label>
                    </div>
                            
                    <input type="text" disabled className="w-[200px] h-[50px] border-1 p-4 cursor-not-allowed
                    bg-white" 
                    placeholder={userData.data[0].fullName}/>

                    <div className="flex gap-2">
                        
                        <Mail className="text-white"/> 
                        <label className="text-white">Email</label>
                    </div>

                    <input type="text" disabled className="w-[200px] h-[50px] border-1 p-4 cursor-not-allowed
                    bg-white" 
                    placeholder={userData.data[0].email}/>
                </div>
                : null
            }
            
        </div>

    </div>
}