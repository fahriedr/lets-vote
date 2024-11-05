export type Poll = {
    title: string;
    option: Option[];
    isSelectMultiple: boolean;
    isAllowComment: boolean;
    isCloseWithDate: boolean;
    endDate?: string;
    voteSecurity: VoteSecurity;
    isRequireName: boolean;
    name?: string;
};

export type Option = {
    name: string;
}

export enum VoteSecurity {
    IpAddress,
    BrowserSection
}