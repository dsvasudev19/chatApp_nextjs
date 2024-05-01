import { NextRequest,NextResponse } from "next/server";
import axios from "axios";
import User from '@/app/api/models/user'


export async function GET(){
    try {
        const users=await User.findAll();
        console.log(users);
        return NextResponse.json({message:"success guru"})
    } catch (error) {
        console.log(error)
    }
}

