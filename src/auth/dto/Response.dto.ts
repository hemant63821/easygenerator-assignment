
export class ApiResponse{
    constructor(public isSuccessful: boolean, public data: any, public message: string, ) {}
  }

export class SuccessResponse extends ApiResponse {
    constructor(data: any, message = 'Success') {
      super(true, data, message);
    }
  }
  
  export class ErrorResponse extends ApiResponse {
    constructor(message = 'An error occurred') {
      super(false, null, message);
    }
  }