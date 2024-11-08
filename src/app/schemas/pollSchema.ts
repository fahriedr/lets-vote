import { Schema, model, models} from 'mongoose';
import { Option, VoteSecurity } from '../types/index';

interface IPoll {
    unique_id: string;
    title: string;
    slug: string;
    options: Option[];
    multiple_choice: boolean;
    allow_comment: boolean;
    end_date?: string;
    vote_security: VoteSecurity;
    require_voter_name: boolean
}

export const pollSchema = new Schema<IPoll>({
    unique_id: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    options: { type: [Option], required: true },
    multiple_choice: {type: Boolean, required: true},
    allow_comment: {type: Boolean, required: true},
    end_date: {type: String, nullable: true},
    vote_security: {type: String, required: true},
    require_voter_name: {type: Boolean, required: true},
});

export const Poll = models.Poll || model<IPoll>('Poll', pollSchema);