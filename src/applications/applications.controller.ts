import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Resource, Roles } from 'nest-keycloak-connect';
import { ApplicationService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
@ApiTags('Applications')
@Resource('backend-application-map')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @ApiBearerAuth()
  @Roles({ roles: ['application-create', 'application-admin'] })
  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.service.create(createApplicationDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles({ roles: ['application-list', 'application-admin'] })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  async findAll(@Query('name') name?: string) {
    if (name) {
      return await this.service.findByName(name);
    }
    return await this.service.findAll();
  }

  @ApiBearerAuth()
  @Roles({ roles: ['application-read', 'application-admin'] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @Roles({ roles: ['application-update', 'application-admin'] })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.service.update(id, updateApplicationDto);
  }

  @ApiBearerAuth()
  @Roles({ roles: ['application-delete', 'application-admin'] })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
