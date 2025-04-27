import { FaBeer, FaQuestion } from 'react-icons/fa';

export default function Signup(){



    async function onSubmit(){
        try {
            
            

        } catch (e) {
            
        }
    }


    return <div className="w-full h-screen flex flex-col items-center bg-[#F1E7E7] ">
        <h1 className="w-[90%] text-2xl lg:text-5xl mt-6 underline underline-offset-4 ">CHAT</h1>

        <div className="w-[30%] border-1 min-h-[400px] h-[450px] flex-col bg-[#E69DB8] mt-5 rounded-[20px] shadow-lg
        items-center flex ">
            <h1 className="w-[100%] text-center mt-4 text-3xl ">SIGN UP</h1>

            <div className="w-[70%] mt-5 flex flex-col">
                <label htmlFor="" className="mb-3">Full Name</label>
                <input type="text" className="p-4 border-1 h-[50px] bg-white" placeholder="Full Name"/>
            </div>
            <div className="w-[70%] mt-2  flex flex-col">
                <label htmlFor="" className="mb-3">Email</label>
                <input type="text" className="p-4 border-1 h-[50px] bg-white" placeholder="Email"/>
            </div>
            <div className="w-[70%] mt-2 flex flex-col mb-8">
                <label htmlFor="" className="mb-3">Password</label>
                <input type="text" className="p-4 border-1 h-[50px]  bg-white" placeholder="Password"/>
            </div>

            <button className="border-1 w-[150px] h-[40px] rounded-[500px] cursor-pointer bg-white
            hover:bg-gray-200 active:scale-95">SIGN UP</button>

        </div>

        <div className='w-[90%] h-[60px] flex justify-end items-center'>
            <div className=' w-[60px] h-[100%] flex justify-center items-center scale-115 rounded-[500px] bg-[#FFFECE]'>
                <h1 className='text-2xl lg:text-3xl text-black cursor-pointer'><FaQuestion/></h1>
            </div>
            
        </div>
        



    </div>
}