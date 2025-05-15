import { useChatStore } from "../../store/useChatStore"
import ColorDiv from "../chat_container/customColor";
import { Colors } from "../../lib/colorCustomize";
import { X } from "lucide-react";

export default function ChangeBgModal(){

    const {setModal} = useChatStore();
    


    return  <>
        {/* Overlay */}
        <div className="fixed inset-0 bg-black opacity-50 z-20"></div>

        {/* Modal */}
        <form
            className="lg:w-[400px] md:w-[400px] w-[300px] border border-gray-300 bg-white fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        rounded-lg flex flex-col items-center shadow-lg"
        >
            <button>
            <X
            className="absolute right-3 top-3 w-8 h-8 cursor-pointer hover:scale-110"
            onClick={setModal}
            />  
            </button> 
            

            <h1 className="mt-10 ml-3 text-red-600">Customize your chat</h1>

            <div className="w-[90%] m-5 grid grid-cols-4 gap-3 place-items-center">
                {Colors.map((color, index) => (
                    <ColorDiv color={color} key={index} />
                ))}
            </div>

        </form>
    </>
}