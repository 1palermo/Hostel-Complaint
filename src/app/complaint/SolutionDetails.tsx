export default async function Data(id:string){
    const apiResponse = await fetch(`http://localhost:8080/report/response?Id=${id}`,{cache : 'no-store'});
    const data = await apiResponse.json();
    return data;
}