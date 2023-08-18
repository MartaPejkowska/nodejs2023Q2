import { LoggerService } from '@nestjs/common';
import { writeFile } from 'fs/promises';

export class MyLogger implements LoggerService {
    private pathToLogFile = 'src/logger/logsFiles/logs.txt';
    private pathToErrorFile = 'src/logger/errorFiles/errors.txt';
    private currentTime: Date;

    public async error(message: string, ...optional: string[]): Promise<void> {
        await this.write('Error ', Color.Red, message, optional[0]);
        await writeFile(this.pathToErrorFile, message, { flag: 'a+' });
    }

    public async warn(message: string, ...optional: string[]): Promise<void> {
        await this.write('Warn ', Color.Yellow, message, optional[0]);
        await writeFile(this.pathToLogFile, message, { flag: 'a+' });
    }

    public async log(message: string, ...optional: string[]): Promise<void> {
        await this.write('Log ', Color.Green, message, optional[0]);
        await writeFile(this.pathToLogFile, message, { flag: 'a+' });
    }

    public async verbose(
        message: string,
        ...optional: string[]
    ): Promise<void> {
        await this.write('Verbose', Color.White, message, optional[0]);
    }

    public async debug(message: string, ...optional: string[]): Promise<void> {
        await this.write('Debug ', Color.White, message, optional[0]);
    }

    private async write(
        Type: string,
        color: string,
        message: string,
        optional: string,
    ): Promise<void> {
        this.currentTime = new Date();

        const pidStr = `[Logger] ${process.pid} -`;
        const timeStr = this.currentTime.toLocaleString();
        const serviceName = `[${optional}]`;

        console.log(
            `${color}${pidStr}`,
            `${Color.White}${timeStr}`,
            `${color}${Type}`,
            `${Color.Yellow}${serviceName}`,
            `${color}${message}`,
        );
    }
}
export const enum Color {
    Green = '\x1b[32m',
    Yellow = '\x1b[33m',
    Red = '\x1b[31m',
    White = '\x1b[0m',
}
