import { NextResponse } from '../../../../node_modules/next/server';

export const GET = async () => {
  try {

    return NextResponse.json({"message" : "Hello"})
  } catch (error) {
      console.log(error)
      return new NextResponse("Something went wrong", { status: 500})
  }
}