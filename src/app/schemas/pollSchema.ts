import { Schema, model, models} from 'mongoose';
import { Option, VoteSecurity } from '../types/index';


export interface IComment {
    unique_id: string;
    name: string;
    text: string;
    browser_key: string;
    created_at?: Date;
}
export interface IPoll {
    unique_id: string;
    title: string;
    slug: string;
    options: Option[];
    multiple_choice: boolean;
    allow_comment: boolean;
    end_date?: string;
    vote_security: VoteSecurity;
    require_voter_name: boolean;
    comments?: IComment[]; 
    created_at: Date;
}

const OptionSchema = new Schema<Option>({
    uuid: { type: String, required: true },
    value: { type: String, required: true },
});

const commentSchema = new Schema<IComment>({
    unique_id: { type: String, required: true },
    name: { type: String, required: true },
    text: { type: String, required: true },
    browser_key: { type: String, required: true },
    created_at: { type: Date, required: true}
})

export const pollSchema = new Schema<IPoll>({
    unique_id: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    multiple_choice: {type: Boolean, required: true},
    allow_comment: {type: Boolean, required: true},
    end_date: {type: String, nullable: true},
    vote_security: {type: String, required: true},
    require_voter_name: {type: Boolean, required: true},
    comments: { type: [commentSchema], default: []},
    created_at: {type: Date, required: true},
});

export const Poll = models.Poll || model<IPoll>('Poll', pollSchema);