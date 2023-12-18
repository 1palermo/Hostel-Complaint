"use client"

export default function Return(){
    return(
    <button className="w-full lg:w-auto px-3 py-2 bg-gradient-to-br from-blue-800 to-blue-600 text-white mt-2 text-md rounded-md" onClick={()=>{
        window.history.back();
        }}>
        Return to Home
    </button>
    );
}