import { connectToDatabase } from "@/app/lib/database";
import { Poll } from "@/app/schemas/pollSchema";
import { VoteSecurity } from "@/app/types/index";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

const pollSchema = z.object({
  title: z.string(),
  options: z.string().array(),
  multiple_choice: z.boolean(),
  allow_comment: z.boolean(),
  end_date: z.nullable(z.string()),
  vote_security: z.enum([VoteSecurity.IP, VoteSecurity.BROWSER]),
  require_voter_name: z.boolean(),
});

type Poll = z.infer<typeof pollSchema>;

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const db = await connectToDatabase();
    const body = await req.json();

    // Perform validation
    const result = pollSchema.safeParse(body);

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
      );
    }

    const data = result.data

    const poll = new Poll({
      title: data.title,
      options: data.options,
      multiple_choice: data.multiple_choice,
      allow_comment: data.allow_comment,
      end_data: data.end_data ?? null,
      vote_security: data.vote_security,
      require_voter_name: data.require_voter_name
    });

    const res = await poll.save()

    return NextResponse.json({ message: "create" });
  } catch (error) {
    console.log(error, "error");
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
