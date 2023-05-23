import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { getWinstonConfig } from './common/configs/winston.config';
import { HttpExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(WinstonModule.createLogger(getWinstonConfig));
  // Set global prefix for routes
  app.setGlobalPrefix('api');
  // Enable global validation request body data
  app.useGlobalPipes(new ValidationPipe());
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    const config = new DocumentBuilder()
      .setTitle('Shopify layer')
      .setDescription('Shopify layer API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-route', app, document);
  }
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionsFilter(httpAdapter));
  await app.listen(4000);
}
bootstrap();
