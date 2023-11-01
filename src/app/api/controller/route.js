import connect from '../config/route'
import { NextResponse } from 'next/server';
import Report from '../model/report';
import mongoose from 'mongoose';

export async function GET(req,res){
    await mongoose.connect('mongodb://0.0.0.0:27017/hostelDatabase');
    const reports= await Report.find({});
    return NextResponse.json({reports});
}
