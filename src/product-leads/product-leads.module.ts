import { Module } from '@nestjs/common';
import { ProductLeadsService } from './product-leads.service';
import { ProductLeadsController } from './product-leads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductLead, ProductLeadSchema } from './entities/product-lead.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductLead.name, schema: ProductLeadSchema },
    ]),
  ],
  controllers: [ProductLeadsController],
  providers: [ProductLeadsService],
})
export class ProductLeadsModule {}
