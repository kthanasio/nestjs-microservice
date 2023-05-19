import {
  HttpException, HttpStatus, Injectable, Scope,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductLeadDto } from './dto/create-product-lead.dto';
import { UpdateProductLeadDto } from './dto/update-product-lead.dto';
import { ProductLead } from './entities/product-lead.entity';

const PRODUCT_LEAD_NOT_FOUND_MESSAGE = 'Product Lead not found';
const PRODUCT_LEAD_ALREADY_EXISTS_MESSAGE = 'Product Lead Already Exists';

@Injectable({ scope: Scope.REQUEST })
export class ProductLeadsService {
  constructor(
    @InjectModel(ProductLead.name)
    private readonly model: Model<ProductLead>,
  ) {}

  async create(
    createProductLeadDto: CreateProductLeadDto,
  ): Promise<ProductLead> {
    try {
      const productLead = new this.model(createProductLeadDto);
      return await productLead.save();
    } catch (error: any) {
      if (error.code == '11000') {
        throw new HttpException(
          PRODUCT_LEAD_ALREADY_EXISTS_MESSAGE,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async findAll() {
    const result = await this.model.find();
    return result;
  }

  async query(st: string) {
    const query = {
      status: st,
    };
    return await this.model.find(query, '_id name');
  }

  async findOne(id: string) {
    const productLead = await this.model
      .findOne({ _id: id })
      .orFail(
        new HttpException(PRODUCT_LEAD_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
    return productLead;
  }

  async findByName(name?: string) {
    const result = await this.model.find({
      name: { $regex: name, $options: 'i' },
    });
    return result;
  }

  async update(
    id: string,
    updateProductLeadDto: UpdateProductLeadDto,
  ): Promise<ProductLead> {
    let productLead;
    try {
      productLead = await this.model.findOne({ _id: id });
      const { name, status, email } = updateProductLeadDto;
      productLead.name = name;
      productLead.email = email;
      productLead.status = status;
      await productLead.save();
      return productLead;
    } catch (error) {
      if (error.code == '11000') {
        throw new HttpException(
          PRODUCT_LEAD_ALREADY_EXISTS_MESSAGE,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        PRODUCT_LEAD_NOT_FOUND_MESSAGE,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: string) {
    return await this.model
      .findOneAndDelete({
        _id: id,
      })
      .orFail(
        new HttpException(PRODUCT_LEAD_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
  }
}
