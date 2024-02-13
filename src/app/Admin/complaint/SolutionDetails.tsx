import axios from 'axios';

export default async function Data(id:string){
    const apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/report/response?Id=${id}`,{
        validateStatus: (status) => status>= 200 && status<=500
      });

    return apiResponse.data;
}