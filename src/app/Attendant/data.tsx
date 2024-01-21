export default async function Data(){
    const apiResponse = await fetch('http://localhost:8080/report',{cache : 'no-store'});
    const data = await apiResponse.json();
    return data;
}