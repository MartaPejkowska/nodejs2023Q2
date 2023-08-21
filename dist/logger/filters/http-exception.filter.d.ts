import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private logger;
    catch(exception: HttpException, host: ArgumentsHost): Promise<void>;
}
export declare class NotFoundException extends HttpException {
    constructor(message: string);
}
export declare class BadRequestException extends HttpException {
    constructor(message: string);
}
export declare class ForbiddenException extends HttpException {
    constructor(message: string);
}
export declare class UnauthorizedException extends HttpException {
    constructor(message: string);
}
export declare class UnprocessableEntityException extends HttpException {
    constructor(message: string);
}
