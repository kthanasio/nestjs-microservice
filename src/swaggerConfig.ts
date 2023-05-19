import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const APP_NAME = process.env.APPLICATION_NAME;
const APP_VERSION = process.env.npm_package_version;

export const swaggerConfig = async function conf(
  app: INestApplication,
  modules: any[],
): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`The ${APP_NAME} API description`)
    .setVersion(APP_VERSION)
    .setContact(
      'Kleber Thanasio',
      'https://github.com/kthanasio',
      'klebermt@gmail.com',
    )
    .addServer(`http://localhost:${process.env.APPLICATION_PORT}`)
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: modules,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document);
};
