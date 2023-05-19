import { Routes } from 'nest-router';
import { CompanyModule } from './company/company.module';

export const routes: Routes = [
  {
    path: '',
    module: CompanyModule,
  },
];
