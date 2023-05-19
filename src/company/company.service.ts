import {
  HttpException, HttpStatus, Injectable, Scope,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

const COMPANY_NOT_FOUND_MESSAGE = 'Company not found';
const COMPANY_ALREADY_EXISTS_MESSAGE = 'Company Already Exists';

@Injectable({ scope: Scope.REQUEST })
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const company = new this.companyModel(createCompanyDto);
      return await company.save();
    } catch (error: any) {
      if (error.code == '11000') {
        throw new HttpException(
          COMPANY_ALREADY_EXISTS_MESSAGE,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async findAll() {
    const result = await this.companyModel.find();
    return result;
  }

  async query(st: string) {
    const query = {
      status: st,
    };
    return await this.companyModel.find(query, '_id name');
  }

  async findByName(name?: string) {
    const result = await this.companyModel.find({
      name: { $regex: name, $options: 'i' },
    });
    return result;
  }

  async findOne(id: string) {
    const company = await this.companyModel
      .findOne({ _id: id })
      .orFail(
        new HttpException(COMPANY_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
    return company;
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    let company;
    try {
      company = await this.companyModel.findOne({ _id: id });
      const { name, status } = updateCompanyDto;
      company.name = name;
      company.status = status;
      await company.save();
      return company;
    } catch (error) {
      if (error.code == '11000') {
        throw new HttpException(
          COMPANY_ALREADY_EXISTS_MESSAGE,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(COMPANY_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string) {
    return await this.companyModel
      .findOneAndDelete({
        _id: id,
      })
      .orFail(
        new HttpException(COMPANY_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
  }
}
