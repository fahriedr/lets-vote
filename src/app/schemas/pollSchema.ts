import { Schema, model, models} from 'mongoose';
import { VoteSecurity } from '../types/index';

interface IPoll {
    title: string;
    options: string[];
    multiple_choice: boolean;
    allow_comment: boolean;
    end_data?: string;
    vote_security: VoteSecurity;
    require_voter_name: boolean
}

export const pollSchema = new Schema<IPoll>({
    title: { type: String, required: true },
    options: { type: [String], required: true },
    multiple_choice: {type: Boolean, required: true},
    allow_comment: {type: Boolean, required: true},
    end_data: {type: String, nullable: true},
    vote_security: {type: String, required: true},
    require_voter_name: {type: Boolean, required: true},
});

export const Poll = models.Poll || model<IPoll>('Poll', pollSchema);