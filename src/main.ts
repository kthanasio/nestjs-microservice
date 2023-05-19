import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ProductLeadsModule } from 'product-leads/product-leads.module';
import { DepartmentsModule } from 'departments/departments.module';
import { ApplicationsModule } from 'applications/applications.module';
import { swaggerConfig } from './swaggerConfig';
import { CompanyModule } from './company/company.module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  await swaggerConfig(app, [
    CompanyModule,
    ProductLeadsModule,
    DepartmentsModule,
    ApplicationsModule,
  ]);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = process.env.APPLICATION_PORT || 3000;
  await app
    .listen(port)
    .then(() => console.log(`Application listening on port ${port}`));
}
bootstrap();
