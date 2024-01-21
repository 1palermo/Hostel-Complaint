'use client'
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import convertToBase64 from '../Base64';

interface data{
   text: string;
   image: string;
};

export default function Form(props:{id:string, attended:string }){

    const [formD, setForm] = useState<data>({
        text: '',
        image: ''
    });

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleTextChange = (e:ChangeEvent<HTMLInputElement>) => {
        setForm({...formD, text:e.target.value});
    };

    
    const handleImageChange = async(e:ChangeEvent<HTMLInputElement>) => {
        let file;
        if(e.target.files){
        file= e.target.files[0];
        }
        const base64 = await convertToBase64(file);
        setForm({...formD, image: base64});
    };
    
    async function handleSolved(id:string, event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = JSON.parse(window.localStorage.getItem("customToken") || "");
        await fetch(`https://hostel-complaint-website.onrender.com/report?cat=${"Solved"}&Id=${id}`,{
        method: "POST" ,
        body: JSON.stringify({data:formD, userToken: token.token}) ,
        headers:{
            "Content-Type": "application/json",
        }})
        .then(data=>{
            console.log(data)
        })
        .catch(error=>{
            console.log(error)
        })
        setForm({
            text: '',
            image: ''
        });
        setShowConfirmation(true);
        return;
    }

    async function handleAttended(id:string, event: React.FormEvent<HTMLFormElement>) {
        const token = JSON.parse(window.localStorage.getItem("customToken") || "");
        fetch(`https://hostel-complaint-website.onrender.com/submitReport?cat=${"Attended"}&Id=${id}`,{
        method: "POST" ,
        body: JSON.stringify({data:formD, userToken: token.token}) ,
        headers:{
            "Content-Type": "application/json",
        }})
        .then(data=>{
            console.log(data)
        })
        .catch(error=>{
            console.log(error)
        })
        // const result= await response.json();
        setForm({
            text: '',
            image: ''
        });
        setShowConfirmation(true);
        return;
    }
    

    return(
        <>
            <br />
            <hr />
            <br />
            <h1 className="font-bold mb-4 w-full text-center text-2xl">Enter Your Response</h1>
            {
               props.attended === "Unattended"? 
               <form className="w-3/4 mx-auto mt-8 p-4 bg-gray-100" onSubmit={async(res)=>{
                await handleAttended(props.id, res)
               }}>
               <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700">Description</label>
               <input
                  type="text"
                  value={formD.text}
                  onChange={handleTextChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                  required
               />
               </div>
         
               <div className="mb-4">
               <label htmlFor="profileImage" className="block text-sm font-medium text-gray-500">
                    Upload Image
                </label>
                <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/jpg image/jpeg"
                    onChange={handleImageChange}
                    className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
                    required
                />
               </div>
               <button type="button"  className="bg-blue-500 text-white p-2 rounded-md text-center w-full">
                   Attended
               </button>
               </form>:
               <form className="w-3/4 mx-auto mt-8 p-4 bg-gray-100" onSubmit={async(res)=>{
                await handleSolved(props.id, res)
               }}>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                type="text"
                value={formD.text}
                onChange={handleTextChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full "
                required
                />
                </div>
        
                <div className="mb-4">
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-500">
                        Upload Image
                    </label>
                    <input
                        id="profileImage"
                        name="profileImage"
                        type="file"
                        accept="image/jpg image/jpeg"
                        onChange={handleImageChange}
                        className="mt-1 p-2 w-full rounded-md border border-gray-300 bg-white text-gray-900"
                        required
                    />
                </div>

                <button className="bg-blue-500 text-white p-2 rounded-md text-center w-full">
                    Solved
                </button>
                </form>
            }
            

            {showConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                   <div className="bg-white p-4 rounded-md">
                        <p >Form submitted successfully!</p>
                        <Link href="/Attendant" passHref>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => window.location.href="/Attendant"}>Yes</button>
                        </Link>
                    </div>
                </div>
            )}
            <br />
         </>
    );
}