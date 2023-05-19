import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Company } from 'company/entities/company.entity';
import { Departments } from 'departments/entities/departments.entity';
import { ProductLead } from 'product-leads/entities/product-lead.entity';

export class CreateApplicationDto {
  /**
   * Application Name
   * @example 'Oracle Retail'
   */
  @IsNotEmpty()
  name: string;
  /**
   * Application Roadmap
   * 0 - Desativar
   * 1 - Manter
   * @example '0'
   */
  @IsNotEmpty()
  status = '1';

  @IsNotEmpty({ each: true })
  productLead: ProductLead;

  @IsNotEmpty()
  department: Departments;

  @IsNotEmpty()
  @IsArray()
  companies: Company[];

  @IsNotEmpty()
  @ApiProperty({ enum: ['TOOLS', 'PARTNERS', 'PRODUCT'] })
  applicationType: string;
}
