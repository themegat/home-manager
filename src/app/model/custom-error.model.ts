export class CustomError {
    public origin: string;
    public error: any;
    public message: string;

    constructor(origin: string, error: any, message: string) {
        this.origin = origin;
        this.error = error;
        this.message = message;
    }
}