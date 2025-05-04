import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { ArrowBigLeft, SendToBack } from "lucide-react";


export default function Profile(){

    const {userInfo, userData} = useAuthStore();

    useEffect(() => {
        userInfo()
    }, []);

    console.log(userData.data);

    return <div className="bg-[#F1E7E7] h-screen flex flex-col justify-center items-center relative gap-4">
        <div className="w-[100%] h-[50px] bg-black absolute top-0 flex items-center p-3">
            <a href="/">
                <ArrowBigLeft className="text-white size-[32px] cursor-pointer active:scale-95"/>
            </a>
            
        </div>

        
        
        <div className="w-[500px] h-[300px] border-1 p-4 rounded-[24px] flex gap-4">
            <div className="size-[200px] border-1 rounded-[12px]">

            </div>

            {/* {
                userData.data ?  <h1 className="mt-4 lg:text-2xl">
                                {userData.data[0].fullName}
                </h1>
                : null
            } */}

            {
                userData.data ? <div className="w-[60%] flex flex-col gap-4">
                            <input type="text" disabled className="w-[200px] h-[40px] border-1 p-4 cursor-not-allowed" 
                            placeholder={userData.data[0].fullName}/>

                            <input type="text" disabled className="w-[200px] h-[40px] border-1 p-4 cursor-not-allowed" 
                            placeholder={userData.data[0].email}/>
                </div>
                : null
            }
            
        </div>

    </div>
}