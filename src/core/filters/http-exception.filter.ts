import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Provider } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { Response } from "express";

@Catch(HttpException)
class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res: Response = ctx.getResponse<Response>();
        const status: number = exception.getStatus();
        const message: string = exception.message;

        res.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            message,
        })
    }
}

export const HttpExceptionProvider: Provider = {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
}