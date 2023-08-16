import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

const pathToFile = 'src/logger/logsFiles/logs.txt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('http-logs');

    use(request: Request, response: Response, next: NextFunction): void {
        const { query, body, method, originalUrl } = request;

        response.on('finish', () => {
            const { statusCode } = response;

            const message = `Method:${method}, Url: ${originalUrl}, query parameters: ${JSON.stringify(
                query,
            )}, body: ${JSON.stringify(body)} Status Code:${statusCode}`;
            this.logger.log(message);

            fs.writeFile(pathToFile, message, { flag: 'a+' }, function (err) {
                if (err) throw new Error('FS operation failed');
            });
        });

        next();
    }
}
