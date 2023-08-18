"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("dotenv/config");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger/logger.service");
const http_exception_filter_1 = require("./logger/filters/http-exception.filter");
const PORT = process.env.PORT || 4000;
async function bootstrap() {
    const logger = new logger_service_1.MyLogger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(logger_service_1.MyLogger));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    addListeners(logger);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Home Library Service')
        .setDescription('Home music library service')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('doc', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(PORT, () => console.log(`I'm listening on ${PORT}`));
}
bootstrap();
const addListeners = (logger) => {
    process
        .on('unhandledRejection', async () => {
        logger.error('Unhandled Rejection...');
    })
        .on('uncaughtException', async () => {
        logger.error('Uncaught Exception...');
    });
};
//# sourceMappingURL=main.js.map