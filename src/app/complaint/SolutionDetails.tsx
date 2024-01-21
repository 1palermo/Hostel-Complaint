export default async function Data(id:string){
    const apiResponse = await fetch(`https://hostel-complaint-website.onrender.com/report/response?Id=${id}`,{cache : 'no-store'});
    const data = await apiResponse.json();
    return data;
}