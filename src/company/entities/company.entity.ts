import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  collection: 'companies',
  timestamps: true,
  autoIndex: true,
  optimisticConcurrency: true,
})
export class Company extends Document {
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
   * Company name
   * @example 'Company Name'
   */
  @Prop({
    type: String, unique: true, required: true, index: true,
  })
    name: string;

  /**
   * Company Status
   * 1 - Active
   * 0 - Inactive
   * @example '1'
   */
  @Prop({ required: true })
    status: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
