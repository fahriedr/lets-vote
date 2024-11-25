import { connectToDatabase } from "@/app/lib/database";
import { CustomError, randomUniqueIdGenerator } from "@/app/lib/helper";
import { Poll } from "@/app/schemas/pollSchema";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commentParam = z.object({
    poll_unique_id: z.string(),
    name:z.string(),
    text: z.string(),
    browser_key: z.string(),
})

export const POST = async (req: NextRequest, res: NextResponse) => {

    try {

        await connectToDatabase()

        const body = await req.json()

        //Validate
        const result = commentParam.safeParse(body)

        if(!result.success) {
            return NextResponse.json(
                {
                    message: "Validate Error",
                    errors: result.error.errors.map((err) => ({
						path: err.path,
						message: err.message,
					})),
                },
                { status: 400 }
            )
        }

        const data = result.data

        const query = await Poll.findOne({ unique_id: data.poll_unique_id})

        if (!query) throw new CustomError('Data not found', 404)

        if(!query.allow_comment) throw new CustomError('Comment are not allowed in this poll', 403)

        let comment_data = {
            unique_id: randomUniqueIdGenerator(),
            poll_unique_id: data.poll_unique_id,
            name: data.name,
            text: data.text,
            browser_key: data.browser_key,
            created_at: moment().format('YYYY-MM-DD h:mm:ss')
        }

        query.comments.push(comment_data)
        
        const response = await query.save()

        return NextResponse.json({
            message: "Success",
            success: true,
            data: response
        })
        
    } catch (error) {
        console.error("Error fetching data:", error)

        // Handle CustomError specifically
        if (error instanceof CustomError) {
            return NextResponse.json(
                {
                    message: error.message,
                    success: false,
                },
                { status: error.statusCode }
            )
        }

        // Handle other unknown errors
        return NextResponse.json(
            {
                message: "An unknown error occurred",
                success: false,
            },
            { status: 500 }
        )
    }
}