import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { sessionConfig } from './config/sessionConfig';
import { documentConfig } from './config/swagger';
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

  // class validator
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3119);
}
bootstrap();
