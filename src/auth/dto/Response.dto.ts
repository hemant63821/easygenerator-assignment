// export class ErrorResponse {
//     isSuccessful: boolean = false;
//     error: string;

// }
// export class SuccessResponse {
//     isSuccessful: boolean = true;
//     result: Array<any> | Record<any, any>;
//     message: string;
// }

export class ApiResponse{
    constructor(public data: any, public message: string, public isSuccessful: boolean) {}
  }

export class SuccessResponse<T = any> extends ApiResponse {
    constructor(data: any, message = 'Success') {
      super(data, message, true);
    }
  }
  
  export class ErrorResponse extends ApiResponse {
    constructor(message = 'An error occurred') {
      super(null, message, false);
    }
  }