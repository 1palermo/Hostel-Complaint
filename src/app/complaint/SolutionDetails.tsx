export default async function Data(id:string){
    const apiResponse = await fetch(`https://490bj8xz-8080.inc1.devtunnels.ms/report/response?Id=${id}`,{cache : 'no-store'});
    const data = await apiResponse.json();
    return data;
}