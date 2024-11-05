import { connectToDatabase } from '@/app/lib/database';
import { VoteSecurity } from '@/app/types/index';
import { NextRequest, NextResponse } from 'next/server';
import { z } from "zod";

const pollSchema = z.object({
  title: z.string(),
  option: z.string().array(),
  selectMultiple: z.boolean(),
  allowComment: z.boolean(),
  closeWithDate: z.boolean(),
  endDate: z.nullable(z.string()),
  voteSecurity: z.enum([VoteSecurity.IpAddress, VoteSecurity.BrowserSection]),
  requireName: z.boolean(),
  name: z.string()
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {

    const db = await connectToDatabase()
    const body = await req.json()
    const validate = pollSchema.safeParse(body);


    return NextResponse.json({"message" : "create"})
  } catch (error) {
      console.log(error)
      return new NextResponse("Something went wrong", { status: 500})
  }
}