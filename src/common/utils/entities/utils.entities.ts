
export class RequestResponse {
    statusCode: number;
    message: string;
    data?: any;
}


export class CaughtError {
    code: number;
    message: string;
    response?: any;
}


