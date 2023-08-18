"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntityException = exports.UnauthorizedException = exports.ForbiddenException = exports.BadRequestException = exports.NotFoundException = exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const pathToErrorFile = 'src/logger/errorFiles/errors.txt';
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger('http-exception');
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
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
        return (0, promises_1.writeFile)(pathToErrorFile, resTofile, { flag: 'a+' });
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
class NotFoundException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BadRequestException = BadRequestException;
class ForbiddenException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenException = ForbiddenException;
class UnauthorizedException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class UnprocessableEntityException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.UnprocessableEntityException = UnprocessableEntityException;
//# sourceMappingURL=http-exception.filter.js.map