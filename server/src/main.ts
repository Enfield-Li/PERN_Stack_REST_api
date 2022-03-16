import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { sessionConfig } from './config/sessionConfig';
var cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: [
        'http://localhost:3118',
        'http://localhost:3119',
        // 'http://localhost:3119/socket.io',
      ],
      credentials: true,
    }),
  );

  app.use(sessionConfig);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Api example')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3119);
}
bootstrap();
