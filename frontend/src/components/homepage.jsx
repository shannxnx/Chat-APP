import { useAuthStore } from "../store/useAuthStore"

export default function Homepage(){
    const {logOut} = useAuthStore();

    return <div className="bg-[#F1E7E7]">
        <h1>Home Page Nigga!</h1>
        <button onClick={() => logOut()} className="border-1 bg-black text-white w-[100px] rounded h-[40px]
        mt-10 cursor-pointer active:scale-95">
            Log Out
        </button>
    </div>
}