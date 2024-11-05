import { NextRequest, NextResponse } from '../../../../node_modules/next/server';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {

    return NextResponse.json({"message" : "Hello"})
  } catch (error) {
      console.log(error)
      return new NextResponse("Something went wrong", { status: 500})
  }
}