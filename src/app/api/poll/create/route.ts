import { connectToDatabase } from "@/app/lib/database"
import { Poll } from "@/app/schemas/pollSchema"
import { VoteSecurity } from "@/app/types/index"
import { NextRequest, NextResponse } from "next/server"
import { ZodError, z,  } from "zod"
import slugify from "slugify"
import { v4 as uuidv4 } from 'uuid'
import { randomUniqueIdGenerator } from "@/app/lib/helper"
import moment from "moment"

const pollSchema = z.object({
	title: z.string(),
	options: z.string().array(),
	multiple_choice: z.boolean(),
	allow_comment: z.boolean(),
	end_date: z.nullable(z.string()),
	vote_security: z.enum([VoteSecurity.IP, VoteSecurity.BROWSER], { message: 'Vote Security cannot be empty'}),
	require_voter_name: z.boolean(),
})

type Poll = z.infer<typeof pollSchema>

export const POST = async (req: NextRequest, res: NextResponse) => {
	try {
		await connectToDatabase()
		const body = await req.json()

		// Perform validation
		const result = pollSchema.safeParse(body)

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

		const options = data.options.map((i: any) => {
			const opt = {
				uuid: uuidv4(),
				value: i
			}
			return opt
		})

		console.log(moment().format('YYYY-MM-DD h:mm:ss'), 'date')

		const poll = new Poll({
			unique_id: randomUniqueIdGenerator(),
			title: data.title,
			slug: slugify(data.title, { lower: true }),
			options: options,
			multiple_choice: data.multiple_choice,
			allow_comment: data.allow_comment,
			end_date: data.end_date ?? null,
			vote_security: data.vote_security,
			require_voter_name: data.require_voter_name,
			created_at: moment().format('YYYY-MM-DD h:mm:ss')
		})

		const response = await poll.save()

		return NextResponse.json({
			message: "create",
			success: true,
			data: response
		})
	} catch (error) {
		console.log(error, "error")
		return new NextResponse("Something went wrong", { status: 500 })
	}
}
