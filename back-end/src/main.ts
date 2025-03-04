import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  // Add global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // Remove unknown fields from incoming data
      whitelist: true,
      // Type transformation for incoming data
      transform: true,
    }),
  );

  // Setup swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Payplus')
    .setDescription('The Payplus BE API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    exposedHeaders: '*',
  });

  // Run app
  await app.listen(config.get('PORT') as number);
}

bootstrap();
