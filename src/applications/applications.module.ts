import { Module } from '@nestjs/common';
import { ApplicationService } from './applications.service';
import { ApplicationController } from './applications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Applications,
  ApplicationSchema,
} from './entities/applications.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applications.name, schema: ApplicationSchema },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationsModule {}
