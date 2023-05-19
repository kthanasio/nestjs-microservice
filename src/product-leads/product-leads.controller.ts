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
import { Public, Resource, Roles } from 'nest-keycloak-connect';
import { ProductLeadsService } from './product-leads.service';
import { CreateProductLeadDto } from './dto/create-product-lead.dto';
import { UpdateProductLeadDto } from './dto/update-product-lead.dto';

@Controller('')
@ApiTags('Product Leads')
@Resource('backend-application-map')
export class ProductLeadsController {
  constructor(private readonly productLeadsService: ProductLeadsService) {}

  @ApiBearerAuth()
  @Roles({ roles: ['product-leads-create', 'product-leads-admin'] })
  @Post('/product-leads')
  create(@Body() createProductLeadDto: CreateProductLeadDto) {
    return this.productLeadsService.create(createProductLeadDto);
  }

  @ApiBearerAuth()
  @Get('/product-leads')
  @Roles({ roles: ['product-leads-list', 'product-leads-admin'] })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'A parameter. Optional',
    required: false,
  })
  async findAll(@Query('name') name?: string) {
    if (name) {
      return await this.productLeadsService.findByName(name);
    }
    return await this.productLeadsService.findAll();
  }

  @Get('/public/product-leads')
  @Public()
  @ApiQuery({
    name: 'status',
    type: Boolean,
    description: 'Status parameter.',
    required: true,
  })
  async publicFindAll(@Query('status') status: boolean) {
    const result = await this.productLeadsService.query(
      String(status) == 'true' ? '1' : '0',
    );
    return result;
  }

  @ApiBearerAuth()
  @Roles({ roles: ['product-leads-read', 'product-leads-admin'] })
  @Get('/product-leads/:id')
  findOne(@Param('id') id: string) {
    return this.productLeadsService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles({ roles: ['product-leads-update', 'product-leads-admin'] })
  @Put('/product-leads/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductLeadDto: UpdateProductLeadDto,
  ) {
    return this.productLeadsService.update(id, updateProductLeadDto);
  }

  @ApiBearerAuth()
  @Roles({ roles: ['product-leads-delete', 'product-leads-admin'] })
  @Delete('/product-leads/:id')
  remove(@Param('id') id: string) {
    return this.productLeadsService.remove(id);
  }
}
