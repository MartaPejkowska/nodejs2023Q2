// import { Injectable, LoggerService } from '@nestjs/common';
import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// export class MyLogger implements LoggerService {
//     /**
//      * Write a 'log' level log.
//      */
//     log(message: 'dupa', ...optionalParams: any[]) {}

//     /**
//      * Write an 'error' level log.
//      */
//     error(message: any, ...optionalParams: any[]) {}

//     /**
//      * Write a 'warn' level log.
//      */
//     warn(message: any, ...optionalParams: any[]) {}

//     /**
//      * Write a 'debug' level log.
//      */
//     debug?(message: any, ...optionalParams: any[]) {}

//     /**
//      * Write a 'verbose' level log.
//      */
//     verbose?(message: any, ...optionalParams: any[]) {}
// }
// @Injectable({ scope: Scope.TRANSIENT })
// export class MyLogger extends ConsoleLogger {
//     customLog() {
//         this.log('Please feed the cat!');
//     }
// }

export class MyLogger extends ConsoleLogger {
    // customLog(req) {

        // res.on('close', () => {
        //     const { statusCode } = res;

            // this.log(
            //     `Method: ${req.method}, Url: ${req.protocol}://${req.get('Host')}${req.originalUrl}, query parameters: ${JSON.stringify(
            //         req.query,
            //     )}, body: ${JSON.stringify(
            //         req.body,
            //     )},
            //     `,
            // );

        // });
    // }
    // customLog(request, response) {
    //     // use(request: Request, response: Response): void {
    //     const { body, method } = request;
    //     // const userAgent = request.get('user-agent') || '';

    //     this.log(`method:${method}, body: ${JSON.stringify(body)} `);
    // }
    // this.log('susssss');
}

//     error(message: any, stack?: string, context?: string) {
//         // add your tailored logic here
//         // super.error(...arguments);
//     }
