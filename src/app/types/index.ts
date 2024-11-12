export type Poll = {
    title: string;
    options: Option[];
    multiple_choice: boolean;
    allow_comment: boolean;
    end_date?: string;
    vote_security: VoteSecurity;
    require_voter_name: boolean;
    date?: Date
};

export type Option = {
    uuid: string;
    value: string;
}

export enum VoteSecurity {
    IP = "ip",
    BROWSER = "browser"
}

export type Vote = {
    name?: string;
    poll_id: string;
}