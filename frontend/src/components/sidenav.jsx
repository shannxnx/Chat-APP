import { FanIcon, LogOut, Search, User2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import SideProfile from "./side_profile";
import { Profiler, useEffect } from "react";




const testProfile2 = [
    "https://i.pinimg.com/736x/f1/2c/c8/f12cc8789387fda6d02aa79df5227e84.jpg",
    "https://i.redd.it/v62wta20ht4b1.jpg",
    "https://i.pinimg.com/736x/a4/9d/dc/a49ddcb9ca51732c8813bb9389d21317.jpg",
    "https://i.pinimg.com/736x/a6/8a/a5/a68aa5a57722acf827e88fd6b54bb627.jpg"
]


export default function Sidenav(){
    
    const {logOut, allUsers, setAllUsers} = useAuthStore();

    useEffect(() => {
        setAllUsers();
    }, [])

    console.log(allUsers);

    return <div className="w-[400px] h-screen bg-black flex">
        

        <div className="w-[35%] h-full max-h-full bg-[#0B192C] flex flex-col items-center overflow-x-hidden">
            {/* {
                testProfile2.map((items, index) => <SideProfile profile={items} key={index}/>)
            } */}

            {
                allUsers[0] &&
                allUsers.map((items, index) => <SideProfile profile={items.profilePic} key={index}/>)
            }
            
            
        </div>

        <div className="w-full h-full">
            <div className="text-white  flex justify-between p-3">
                {/* <Search className="text-black"/> */}
                <a href="/profile"><User2 className="cursor-pointer"/></a>
                
                <LogOut className="cursor-pointer" onClick={() => logOut()}/>
            </div>
        </div>

        
    </div>
}