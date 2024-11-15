import { Schema, model, models} from 'mongoose';

type Value = {
    uuid: string;
}

export interface IVote {
    unique_id: string;
    poll_unique_id: string;
    name?: string;
    ip?: string;
    browser?: string;
    value: string[];
    created_at: Date;
}

export const voteSchema = new Schema<IVote>({
    unique_id: {type: String, required: true},
    poll_unique_id: { type: String, required: true, ref: 'Poll' },
    name: { type: String, required: false },
    ip: { type: String, required: false },
    browser: { type: String, required: false },
    value: { type: [String], required: true },
    created_at: { type: Date, required: true },

});

export const Vote = models.Vote || model<IVote>('Vote', voteSchema);