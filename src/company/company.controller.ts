import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Headers,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, Resource, Roles } from 'nest-keycloak-connect';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('')
@ApiTags('Companies')
@Resource('backend-application-map')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBearerAuth()
  @Roles({ roles: ['company-create', 'company-admin'] })
  @Post('/companies')
  async create(@Headers() headers, @Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }

  @ApiBearerAuth()
  @Get('/companies')
  @Roles({ roles: ['company-list', 'company-admin'] })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  async findAll(@Query('name') name?: string) {
    if (name) {
      return await this.companyService.findByName(name);
    }
    return await this.companyService.findAll();
  }

  @Get('/public/companies')
  @Public()
  @ApiQuery({
    name: 'status',
    type: Boolean,
    description: 'Status parameter.',
    required: true,
  })
  async publicFindAll(@Query('status') status: boolean) {
    const result = await this.companyService.query(
      String(status) == 'true' ? '1' : '0',
    );
    return result;
  }

  @ApiBearerAuth()
  @Get('/companies/:id')
  @Roles({ roles: ['company-read', 'company-admin'] })
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOne(id);
  }

  @ApiBearerAuth()
  @Put('/companies/:id')
  @Roles({ roles: ['company-update', 'company-admin'] })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @ApiBearerAuth()
  @Delete('/companies/:id')
  @Roles({ roles: ['company-delete', 'company-admin'] })
  async remove(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }
}
