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
    constructor(public isSuccessful: boolean, public data: any, public message: string, ) {}
  }

export class SuccessResponse<T = any> extends ApiResponse {
    constructor(data: any, message = 'Success') {
      super(true, data, message);
    }
  }
  
  export class ErrorResponse extends ApiResponse {
    constructor(message = 'An error occurred') {
      super(false, null, message);
    }
  }