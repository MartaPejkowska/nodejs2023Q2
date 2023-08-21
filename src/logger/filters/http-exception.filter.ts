import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { writeFile } from 'fs/promises';

const pathToErrorFile = 'src/logger/errorFiles/errors.txt';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger('http-exception');
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
        });

        const resTofile = JSON.stringify({
            StatusCode: status,
            Message: exception.message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });

        this.logger.error(resTofile);
        return writeFile(pathToErrorFile, resTofile, { flag: 'a+' });
    }
}

export class NotFoundException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.FORBIDDEN);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}

export class UnprocessableEntityException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
