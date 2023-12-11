import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: HttpException, host: ArgumentsHost): void {
        
        const { httpAdapter } = this.httpAdapterHost;
      
        const ctx = host.switchToHttp();
       
        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorBody: any = exception instanceof HttpException ? exception.getResponse() : "error"
      
        if (httpStatus === 500) {
          console.log("<---- This is causing Internal Server error in Server --->")
          console.log(exception)
          console.log("<----- Log End ------>")
        }
      
        const responseBody = {
            isSuccessful: false, 
            error: errorBody?.error, 
            message : errorBody?.message || errorBody
          };
      
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}