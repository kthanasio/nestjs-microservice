import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { swaggerConfig } from './swaggerConfig';
import { ProductLeadsModule } from 'product-leads/product-leads.module';
import { DepartmentsModule } from 'departments/departments.module';
import { ApplicationsModule } from 'applications/applications.module';

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
