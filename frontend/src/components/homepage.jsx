import { useAuthStore } from "../store/useAuthStore"
import Sidenav from "./sidenav";

export default function Homepage(){
    const {logOut} = useAuthStore();

    return <div className="bg-[#F1E7E7] w-screen h-screen border-1 flex overflow-hidden">
        <Sidenav/>

        <div className="w-[100%] h-full  bg-white">
            
        </div>

        
    </div>
}