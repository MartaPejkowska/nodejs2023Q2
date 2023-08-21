"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const pathToFile = 'src/logger/logsFiles/logs.txt';
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('http-logs');
    }
    use(request, response, next) {
        const { query, body, method, originalUrl } = request;
        response.on('finish', () => {
            const { statusCode } = response;
            const message = `Method:${method}, Url: ${originalUrl}, query parameters: ${JSON.stringify(query)}, body: ${JSON.stringify(body)} Status Code:${statusCode}`;
            this.logger.log(message);
            fs.writeFile(pathToFile, message, { flag: 'a+' }, function (err) {
                if (err)
                    throw new Error('FS operation failed');
            });
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=loggerMiddleware.js.map