import { connectToDatabase } from "@/app/lib/database"
import { CustomError } from "@/app/lib/helper";
import { Poll } from "@/app/schemas/pollSchema"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {

    try {

        await connectToDatabase()
        const { id } = await params;

        const query = await Poll.findOne({
            unique_id: id
        })
        .populate('comments')
        .exec()

        console.log(query, 'query')

        if (!query) throw new CustomError('Data not found', 404)

        return NextResponse.json({
            message: "success",
            success: true,
            data: query
        })

    } catch (error) {
        console.error("Error fetching data:", error);

        // Handle CustomError specifically
        if (error instanceof CustomError) {
            return NextResponse.json(
                {
                    message: error.message,
                    success: false,
                },
                { status: error.statusCode }
            );
        }

        // Handle other unknown errors
        return NextResponse.json(
            {
                message: "An unknown error occurred",
                success: false,
            },
            { status: 500 }
        );
    }
};
