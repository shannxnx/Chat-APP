import { FanIcon, LogOut, Search, User2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import SideProfile from "./side_profile";
import { Profiler, useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import avatar from "../../../public/avatar.png";
import SideChatBox from "./sideChat_box";



const testProfile2 = [
    "https://i.pinimg.com/736x/f1/2c/c8/f12cc8789387fda6d02aa79df5227e84.jpg",
    "https://i.redd.it/v62wta20ht4b1.jpg",
    "https://i.pinimg.com/736x/a4/9d/dc/a49ddcb9ca51732c8813bb9389d21317.jpg",
    "https://i.pinimg.com/736x/a6/8a/a5/a68aa5a57722acf827e88fd6b54bb627.jpg"
]


export default function Sidenav(){
    
    const {logOut, allUsers, setAllUsers, checkAuth, authUser} = useAuthStore();
    const {users,  getUsers, isSelectedUser, setSelectedUser, isUserLoading} = useChatStore();

    const onlineUsers = [];

    useEffect(() => {
        setAllUsers();
    }, []);

    useEffect(() => {
        getUsers();
    }, [getUsers])


    console.log("isSelectedUser: ", isSelectedUser);

    
    // console.log("chat (users): ", users);

    return <div className="lg:w-[420px] md:w-[300px] w-[80px] h-screen bg-black flex relative">
        

        <div className="lg:w-[35%] lg:h-full w-[0%] bg-[#0B192C] lg:flex flex-col items-center overflow-x-hidden
        md:hidden  sm:hidden">
            
            {/*This uses the state from the auth*/}
            {
                allUsers[0] &&
                allUsers.map((items, index) => <SideProfile profile={items} key={index}/>)
            }
            
            
        </div>

        <div className="w-full h-full flex flex-col ">
            <div className="text-white  flex justify-between p-3">
                {/* <Search className="text-black"/> */}
                <a href="/profile" className="hidden lg:block md:block"><User2 className="cursor-pointer"/></a>
                {/* <SideProfile profile={allUsers[0]}/> */}
                
                <LogOut className="cursor-pointer" onClick={() => logOut()}/>
            </div>
            <div className="w-full h-[100%]  overflow-y-scroll flex flex-col gap-3">
                
                {/*This uses the state from the chat*/}
                {
                    users && users.map((user) => <SideChatBox user={user} key={user._id}/>)
                }

            </div>
        </div>

        

        
    </div>
}