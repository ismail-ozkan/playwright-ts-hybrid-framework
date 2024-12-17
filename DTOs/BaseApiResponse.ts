export class BaseApiResponse<T> {
    statusCode: number;
    message: string;
    correlationId: string | null;
    requestId: string | null;
    result: T;

    constructor(
        statusCode: number,
        message: string,
        correlationId: string | null,
        requestId: string | null,
        result: T
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.correlationId = correlationId;
        this.requestId = requestId;
        this.result = result;
    }
}