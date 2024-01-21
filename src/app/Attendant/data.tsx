export default async function Data(){
    const apiResponse = await fetch('https://hostel-complaint-website.onrender.com/report',{cache : 'no-store'});
    const data = await apiResponse.json();
    return data;
}