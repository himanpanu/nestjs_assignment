import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { clientUrl, port } from './utils/constants';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: clientUrl,
      credentials: true,
    },
  });

  app.use(cookieParser());

  app.use(csurf({ cookie: true }));

  const config = new DocumentBuilder()
    .setTitle('Users Crud with Auth')
    .setDescription(
      'Ability to add users and login, signup with session and cookies',
    )
    .setVersion('1.0')
    .addTag("API's")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(helmet());

  await app.listen(port);
}
bootstrap();
