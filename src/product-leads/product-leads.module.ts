import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductLeadsService } from './product-leads.service';
import { ProductLeadsController } from './product-leads.controller';
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
