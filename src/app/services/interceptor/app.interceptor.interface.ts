export interface JsonObject {
    [key: string]: {
        type: string;
        value?: string;
        msg: string;
        path: string;
        location: string;
    };
}

export interface ResultObject {
    type: string;
    value?: string;
    msg: string;
    path: string;
    location: string;
    key: string;
}