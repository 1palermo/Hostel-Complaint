import axios from 'axios';
export default async function Data(){
    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/report`,{
        validateStatus: (status) => status>= 200 && status<=500
    });
    return apiResponse.data;
}