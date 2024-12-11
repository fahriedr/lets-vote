import { NextRequest, NextResponse } from "next/server"
import { CustomError, randomUniqueIdGenerator } from "@/app/lib/helper"
import { z } from "zod"
import { connectToDatabase } from "@/app/lib/database"
import { Vote } from "@/app/schemas/voteSchema"
import { Poll } from "@/app/schemas/pollSchema"
import { Option } from "@/app/types"
import moment from "moment"

const voteSchema = z.object({
    poll_unique_id: z.string(),
    options: z.string().array(),
    name: z.optional(z.string()),
    browser_key: z.optional(z.string())
})

export const POST = async (req: NextRequest) => {

    
    try {

        await connectToDatabase()

		const body = await req.json()

        // Perform validation
        const result = voteSchema.safeParse(body)

        const ip_address = req.headers.get('x-forwarded-for')

        if (!result.success) {
			// Validation failed, return an error response with details
			return NextResponse.json(
				{
					message: "Validation error",
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

        if(!query.multiple_choice && data.options.length > 1) throw new CustomError('Multiple choices is not allowed', 422)

        if(query.require_voter_name && !data.name) throw new CustomError('Name is required', 422)

        if(query.vote_security === 'ip') {
            const checkVoteByIp = await Vote.findOne({poll_unique_id: data.poll_unique_id, ip: ip_address})
            if(checkVoteByIp) throw new CustomError('Your IP Address already voted for this poll.', 422)
        } else {
            const checkVoteByBrowser = await Vote.findOne({poll_unique_id: data.poll_unique_id, browser: data.browser_key})
            if(checkVoteByBrowser) throw new CustomError('You already voted in this poll.', 422)
        }

        if(query.end_date && query.end_date < moment().format('YYYY-MM-DD h:mm:ss')) throw new CustomError('Poll already closed', 422)

        const checkOptions = query.options.filter((option: Option) => 
            body.options.includes(option.uuid)    
        )

        if (checkOptions.length < 1) throw new CustomError('Option is not on the list', 422)

        const vote_data = {
            unique_id: randomUniqueIdGenerator(),
            poll_unique_id: data.poll_unique_id,
            name: data.name,
            value: data.options,
            created_at: moment().format('YYYY-MM-DD h:mm:ss')
        }

        if(query.vote_security === 'ip') {
            vote_data.ip = ip_address
            vote_data.browser = null
        } else {
            vote_data.browser = data.browser_key
            vote_data.ip = null
        }

        const vote = new Vote(vote_data)

		const response = await vote.save()


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