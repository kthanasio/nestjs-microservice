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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentsDto } from './dto/create-department.dto';
import { UpdateDepartmentsDto } from './dto/update-departments.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public, Resource, Roles } from 'nest-keycloak-connect';

@Controller('')
@ApiTags('Departments')
@Resource('backend-application-map')
export class DepartmentsController {
  constructor(private readonly departmentService: DepartmentsService) {}

  @ApiBearerAuth()
  @Roles({ roles: ['department-create', 'department-admin'] })
  @Post('/departments')
  create(@Body() createDepartmentsDto: CreateDepartmentsDto) {
    return this.departmentService.create(createDepartmentsDto);
  }

  @ApiBearerAuth()
  @Get('/departments')
  @Roles({ roles: ['department-list', 'department-admin'] })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  async findAll(@Query('name') name?: string) {
    if (name) {
      return await this.departmentService.findByName(name);
    } else {
      return await this.departmentService.findAll();
    }
  }

  @Get('/public/departments')
  @Public()
  @ApiQuery({
    name: 'status',
    type: Boolean,
    description: 'Status parameter.',
    required: true,
  })
  async publicFindAll(@Query('status') status: boolean) {
    const result = await this.departmentService.query(
      String(status) == 'true' ? '1' : '0',
    );
    return result;
  }

  @ApiBearerAuth()
  @Roles({ roles: ['department-read', 'department-admin'] })
  @Get('/departments/:id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles({ roles: ['department-update', 'department-admin'] })
  @Put('/departments/:id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentsDto: UpdateDepartmentsDto,
  ) {
    return this.departmentService.update(id, updateDepartmentsDto);
  }

  @ApiBearerAuth()
  @Roles({ roles: ['department-delete', 'department-admin'] })
  @Delete('/departments/:id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }
}
