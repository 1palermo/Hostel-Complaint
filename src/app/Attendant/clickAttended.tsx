'use client'

interface AttendedProps{
  data:string;
}

export default function Attended(props:AttendedProps){
  
    const handleAttended = async(id:string) => {
        const response= await fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/report?cat=${"Attended"}&Id=${id}`,{
          method: "POST" ,
          headers:{
            "Content-Type": "application/json",
          }
          })
          const result= await response.json();
    };



   return(
      <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md" onClick={async(res)=>{
        await handleAttended(props.data)
        window.location.reload()
      }}>Attended</button>
   );
}