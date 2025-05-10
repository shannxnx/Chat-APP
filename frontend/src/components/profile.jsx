import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { ArrowBigLeft, Camera, Mail, SendToBack, User } from "lucide-react";
import avatar from "../../public/avatar.png"

export default function Profile(){

    const {userInfo, userData, isUpdatingProfile, updateProfile} = useAuthStore();

    const [selectedImg, setSelectedImg] = useState();

    useEffect(() => {
        if (!userData || !userData.data) {
            userInfo();
          }
    }, [userData]);

    console.log(userData.data);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({profilePic : base64Image})
        }


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
            <img src={userData.data[0].profilePic === "" ? avatar : userData.data[0].profilePic}
        */}
        
        <div className="lg:w-[500px] lg:h-[250px] max-w-[90%] md:w-[500px] md:h-[250px] md:flex-row border-1 flex-col flex p-4 items-center rounded-[24px] lg:flex lg:flex-row 
        gap-4 bg-[#0B192C] ">

            <div className="size-[200px] border-1 rounded-[500px] bg-white relative">
            
            {
                userData.data ? <img src={selectedImg || userData.data[0].profilePic || avatar}
                 className="size-[200px] rounded-[500px]"/>  
                 : null
            }

                

                <div className="border-1 size-[48px] flex justify-center items-center absolute 
                right-0 bottom-0 mr-3 bg-black rounded-[500px] cursor-pointer hover:scale-105 duration-75">

                        <label
                        htmlFor="file-upload"
                        className="border size-[48px] flex justify-center items-center bg-black rounded-full cursor-pointer absolute right-0 bottom-0"
                        >
                        <Camera className="text-white z-10" />
                        </label>
                        <input
                        type="file"
                        id="file-upload"
                        accept="image/*" 
                        className="opacity-0 absolute inset-0 cursor-pointer"
                        onChange={handleImageUpload}
                        />
                </div>


                
            </div>

            {
                userData.data ? <div className="lg:w-[50%]  flex flex-col gap-4 lg:ml-4 ml-0">
                    <div className="flex gap-2">
                        <User className="text-white"/> 
                        <label className="text-white">Full Name</label>
                    </div>
                            
                    <input type="text" disabled className="lg:w-[200px] md:w-[200px] w-[300px] h-[50px] border-1 p-4 cursor-not-allowed
                    bg-white" 
                    placeholder={userData.data[0].fullName}/>

                    <div className="flex gap-2">
                        
                        <Mail className="text-white"/> 
                        <label className="text-white">Email</label>
                    </div>

                    <input type="text" disabled className="lg:w-[200px] md:w-[200px] w-[300px] h-[50px] border-1 p-4 cursor-not-allowed
                    bg-white" 
                    placeholder={userData.data[0].email}/>
                </div>
                : null
            }
            
        </div>

        <div className="border-1 lg:w-[500px] rounded-[24px] max-w-[90%] lg:h-[60px] bg-[#0B192C] p-5 flex gap-12">
            {
                userData.data && <>
                <h1 className="text-gray-400">Member Since : <span className="ml-3">{userData.data[0].createdAt?.split("T")[0]}</span></h1>
                 <h1 className="text-gray-400">Status : <span className="text-green-400 ml-3"> ACTIVE</span></h1> </>
            }
            
        </div>

    </div>
}