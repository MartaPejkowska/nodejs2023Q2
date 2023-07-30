import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Home Library Service')
        .setDescription('Home music library service')
        .setVersion('1.0')
        // .addTag('')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => console.log(`I'm listening on ${PORT}`));
}

bootstrap();
