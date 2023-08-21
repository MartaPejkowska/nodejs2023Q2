import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './logger/logger.service';
import { HttpExceptionFilter } from './logger/filters/http-exception.filter';

const PORT = process.env.PORT || 4000;

async function bootstrap() {

    const logger = new MyLogger();
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    app.useLogger(app.get(MyLogger));
    app.useGlobalFilters(new HttpExceptionFilter());

    addListeners(logger);

    const config = new DocumentBuilder()
        .setTitle('Home Library Service')
        .setDescription('Home music library service')
        .setVersion('1.0')
        // .addTag('')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => console.log(`I'm listening on ${PORT}`));
}

bootstrap();

const addListeners = (logger: MyLogger): void => {
    process
        .on('unhandledRejection', async () => {
            logger.error('Unhandled Rejection...');
        })
        .on('uncaughtException', async () => {
            logger.error('Uncaught Exception...');
        });
};
