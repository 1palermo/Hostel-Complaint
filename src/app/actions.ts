'use server'
import axios from 'axios';

export async function getUserReports(token:string){
    let report = []
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/report/user`, {
            headers: {
                'Authorization': token,
            },
            validateStatus: (status) => status >= 200 && status <= 500
        });        
        if(response.status === 200){
            report = response.data;  
        }
      //  console.log(report);
        return report;
    } catch (error) {
        console.error("Error fetching reports:", error);
        return [];
    }
}

export async function getReport(token:string, cat:string){
    let report = [];

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=${cat}`, {
            headers: {
                'Authorization': token,
            },
            validateStatus: (status) => status >= 200 && status <= 500
        });        

        if(response.status !== 500){
            report = response.data
        }
       // console.log(report)
        return report;
    } catch (error) {
        console.error("Error fetching reports:", error);
        // Handle the error properly, e.g., return an error response
        return [];
    }
}