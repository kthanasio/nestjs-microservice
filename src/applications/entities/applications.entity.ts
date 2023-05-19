import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Company } from 'company/entities/company.entity';
import { Departments } from 'departments/entities/departments.entity';
import { Document } from 'mongoose';
import { ProductLead } from 'product-leads/entities/product-lead.entity';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  collection: 'applications',
  timestamps: true,
  autoIndex: true,
  optimisticConcurrency: true,
})
export class Applications extends Document {
  /**
   * Application Unique ID
   * @example '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
   */
  @Prop({
    type: String,
    default: (_) => uuidv4(),
    required: true,
  })
  _id: string;
  /**
   * Application Name
   * @example 'Oracle Retail'
   */
  @Prop({ unique: true, required: true, index: true })
  name: string;

  /**
   * Application Roadmap
   * 0 - Desativar
   * 1 - Manter
   * @example '0'
   */
  @Prop({ required: true })
  status: string;

  @Prop({
    type: String,
    ref: ProductLead.name,
    required: true,
  })
  @Type(() => ProductLead)
  productLead: ProductLead;

  @Prop({
    type: String,
    ref: Departments.name,
    required: true,
  })
  @Type(() => Departments)
  department: Departments;

  @Prop({
    type: [
      {
        type: String,
        ref: Company.name,
        required: true,
      },
    ],
  })
  @Type(() => Company)
  companies: Company[];

  @Prop({
    type: String,
    required: true,
    enum: ['TOOLS', 'PARTNERS', 'PRODUCT'],
  })
  applicationType: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Applications);
