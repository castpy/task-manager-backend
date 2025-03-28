import * as crypto from 'crypto';
if (typeof globalThis.crypto === 'undefined') {
  (globalThis as any).crypto = crypto.webcrypto;
}
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'basic-auth-connect';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    logger.log('Aplicação criada com sucesso.');

    app.use(
      `/${process.env.NEST_PROJECT_AMBIENTE}`,
      basicAuth(
        process.env.NEST_SWAGGER_USERNAME_LOGIN,
        process.env.NEST_SWAGGER_USERNAME_PASSWORD,
      ),
    );
    logger.log('Middleware de Basic Auth configurado.');

    const config = new DocumentBuilder()
      .setTitle(
        `${process.env.NEST_PROJECT_NAME.toUpperCase()} - ${process.env.NEST_PROJECT_AMBIENTE.toUpperCase()}`,
      )
      .setVersion(process.env.NEST_PROJECT_VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.NEST_PROJECT_AMBIENTE, app, document);
    logger.log('Swagger configurado.');

    const port = process.env.NEST_PROJECT_PORT || 3000;
    await app.listen(port);
    logger.log(`Aplicação iniciada na porta ${port}.`);
  } catch (error) {
    logger.error('Erro durante a inicialização da aplicação', error.stack);
    process.exit(1);
  }
}
bootstrap();
