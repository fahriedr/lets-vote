import { connectToDatabase } from '@/app/lib/database';
import { NextRequest, NextResponse } from 'next/server';


export const POST = async (req: NextRequest, res: NextResponse) => {
  try {

    const db = await connectToDatabase()

    const body = await req.json();

    

    return NextResponse.json({"message" : "create"})
  } catch (error) {
      console.log(error)
      return new NextResponse("Something went wrong", { status: 500})
  }
}