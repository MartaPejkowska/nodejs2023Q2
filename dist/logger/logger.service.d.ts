import { LoggerService } from '@nestjs/common';
export declare class MyLogger implements LoggerService {
    private pathToLogFile;
    private pathToErrorFile;
    private currentTime;
    error(message: string, ...optional: string[]): Promise<void>;
    warn(message: string, ...optional: string[]): Promise<void>;
    log(message: string, ...optional: string[]): Promise<void>;
    verbose(message: string, ...optional: string[]): Promise<void>;
    debug(message: string, ...optional: string[]): Promise<void>;
    private write;
}
export declare const enum Color {
    Green = "\u001B[32m",
    Yellow = "\u001B[33m",
    Red = "\u001B[31m",
    White = "\u001B[0m"
}
