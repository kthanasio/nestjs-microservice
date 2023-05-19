import { PartialType } from '@nestjs/mapped-types';
import { CreateProductLeadDto } from './create-product-lead.dto';

export class UpdateProductLeadDto extends PartialType(CreateProductLeadDto) {}
