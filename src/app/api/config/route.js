import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req,res){
    await mongoose.connect('mongodb://0.0.0.0:27017/hostelDatabase');
    
    return NextResponse.json({result:true});
}


