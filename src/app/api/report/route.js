import { NextResponse } from "next/server";
import axios from 'axios';

export async function POST(req){
    let report = [];

    try {
        const reqBody= await req.json();
        const {token, cat} = reqBody;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/report?cat=${cat}`, {
            headers: {
                'Authorization': token,
            },
            validateStatus: (status) => status >= 200 && status <= 500
        });        

        report = response.data;   
    } catch (error) {
        console.error("Error fetching reports:", error);
        // Handle the error properly, e.g., return an error response
        return NextResponse.error(error);
    }

    return NextResponse.json(report,{status: 200});
}
