import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"


export default function Profile(){

    const {userInfo, userData} = useAuthStore();

    useEffect(() => {
        userInfo()
    }, []);

    // console.log(userData.data);

    return <div className="bg-[#F1E7E7] h-screen flex flex-col justify-center items-center gap-8">
        <h1>This is profile page nigga</h1>
        <div className="w-[500px] h-[500px] border-1 p-4">
            <div className="size-[200px] border-1">

            </div>
            {
                userData.data ?  <h1 className="mt-4 lg:text-2xl">
                                {userData.data[0].fullName}
                </h1>
                : null
            }
            
        </div>

    </div>
}