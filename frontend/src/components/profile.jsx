import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore"


export default function Profile(){

    const {userInfo, userData} = useAuthStore();

    useEffect(() => {
        userInfo()
    }, []);

    console.log(userData);

    return <div className="bg-[#F1E7E7]">
        <h1>This is profile page nigga</h1>
    </div>
}