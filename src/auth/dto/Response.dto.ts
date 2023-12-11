export class ErrorResponse {
    isSuccessful: boolean = false;
    error: string;

}
export class SuccessResponse {
    isSuccessful: boolean = true;
    result: Array<any> | Record<any, any>;
    message: string;
}