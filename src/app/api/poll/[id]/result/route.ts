import { connectToDatabase } from "@/app/lib/database"
import { CustomError } from "@/app/lib/helper";
import { Poll } from "@/app/schemas/pollSchema"
import { Vote } from "@/app/schemas/voteSchema";
import { NextResponse } from "next/server"


export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {

    try {

        await connectToDatabase()
        const { id } = await params;

        const poll = await Poll.findOne({
            unique_id: id
        }).exec()

        if (!poll) throw new CustomError('Data not found', 404)

        const voteCounts = await Vote.aggregate([
            { $match: { poll_unique_id: poll.unique_id } },
            {
                $lookup: {
                    from: 'polls',
                    localField: 'poll_unique_id',
                    foreignField: 'unique_id',
                    as: 'pollData'
                }
            },
            { $unwind: "$pollData" },
            { $unwind: "$pollData.options" },
            { $unwind: "$value" },
            {
                $match: {
                    $expr: { $eq: ["$value", "$pollData.options.uuid"] }
                }
            },
            {
                $group: {
                    _id: { uuid: "$value", name: "$pollData.options.value" },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    uuid: "$_id.uuid",
                    name: "$_id.name",
                    count: 1
                }
            }
        ]);

        return NextResponse.json({
            message: "success",
            success: true,
            data: {
                poll: poll,
                vote: voteCounts
            }
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
