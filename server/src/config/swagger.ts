import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const documentConfig = new DocumentBuilder()
  .setTitle('Nodejs版 API')
  .setDescription('使用 Nestjs 搭建')
  .setVersion('1.0')
  .build();
