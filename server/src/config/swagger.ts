import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const documentConfig = new DocumentBuilder()
  .setTitle('Api example')
  .setDescription('The API description')
  .setVersion('1.0')
  .build();
