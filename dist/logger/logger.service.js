"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const promises_1 = require("fs/promises");
class MyLogger {
    constructor() {
        this.pathToLogFile = 'src/logger/logsFiles/logs.txt';
        this.pathToErrorFile = 'src/logger/errorFiles/errors.txt';
    }
    async error(message, ...optional) {
        await this.write('Error ', "\u001B[31m", JSON.parse(message), optional[0]);
        await (0, promises_1.writeFile)(this.pathToErrorFile, message, { flag: 'a+' });
    }
    async warn(message, ...optional) {
        await this.write('Warn ', "\u001B[33m", message, optional[0]);
        await (0, promises_1.writeFile)(this.pathToLogFile, message, { flag: 'a+' });
    }
    async log(message, ...optional) {
        await this.write('Log ', "\u001B[32m", message, optional[0]);
        await (0, promises_1.writeFile)(this.pathToLogFile, message, { flag: 'a+' });
    }
    async verbose(message, ...optional) {
        await this.write('Verbose', "\u001B[0m", message, optional[0]);
    }
    async debug(message, ...optional) {
        await this.write('Debug ', "\u001B[0m", message, optional[0]);
    }
    async write(Type, color, message, optional) {
        this.currentTime = new Date();
        const pidStr = `[Logger] ${process.pid} -`;
        const timeStr = this.currentTime.toLocaleString();
        const serviceName = `[${optional}]`;
        console.log(`${color}${pidStr}`, `${"\u001B[0m"}${timeStr}`, `${color}${Type}`, `${"\u001B[33m"}${serviceName}`, `${color}${message}`);
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=logger.service.js.map