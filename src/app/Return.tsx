"use client"

export default function Return(){
    return(
    <button className="sm:w-full lg:w-auto lg:ml-4  px-3 py-2 bg-green-100 text-green-900 mt-2 text-md rounded-md" onClick={()=>{
        window.history.back();
        }}>
        Return to Home
    </button>
    );
}