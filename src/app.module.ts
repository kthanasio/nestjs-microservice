import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';

import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { AppController } from 'app.controller';
import { ConfigModule } from '@nestjs/config';
import { DepartmentsModule } from 'departments/departments.module';
import { ApplicationsModule } from 'applications/applications.module';
import { ProductLeadsModule } from './product-leads/product-leads.module';
import { CompanyModule } from './company/company.module';
import { routes } from './routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_DATABASE}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    RouterModule.forRoutes(routes),
    KeycloakConnectModule.registerAsync({
      useFactory: async () => ({
        authServerUrl: JSON.parse(process.env.KEYCLOAK_JSON)['auth-server-url'],
        realm: JSON.parse(process.env.KEYCLOAK_JSON).realm,
        clientId: JSON.parse(process.env.KEYCLOAK_JSON).resource,
        secret: JSON.parse(process.env.KEYCLOAK_JSON).credentials.secret,
        cookieKey: 'KEYCLOAK_JWT',
        tokenValidation: TokenValidation.ONLINE,
        useNestLogger: false,
      }),
    }),
    CompanyModule,
    ProductLeadsModule,
    DepartmentsModule,
    ApplicationsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
