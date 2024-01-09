export default async function Data(){
    const apiResponse = await fetch('https://490bj8xz-8080.inc1.devtunnels.ms/report',{cache : 'no-store'});
    const data = await apiResponse.json();
    return data;
}