import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Applications } from './entities/applications.entity';

const APPLICATION_NOT_FOUND_MESSAGE = 'Application not found';
const APPLICATION_ALREADY_EXISTS_MESSAGE = 'Application Already Exists';

@Injectable({ scope: Scope.REQUEST })
export class ApplicationService {
  constructor(
    @InjectModel(Applications.name)
    private readonly model: Model<Applications>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Applications> {
    try {
      const company = new this.model(createApplicationDto);
      await company
        .populate('productLead', 'name email _id')
        .populate('department', 'name _id')
        .populate('companies', 'name _id')
        .execPopulate();
      return await company.save();
    } catch (error: any) {
      if (error.code == '11000') {
        throw new HttpException(
          APPLICATION_ALREADY_EXISTS_MESSAGE,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async findAll() {
    const result = await this.model
      .find()
      .populate('productLead', 'name email _id')
      .populate('department', 'name _id')
      .populate('companies', 'name _id')
      .exec();
    return result;
  }

  async findByName(name?: string) {
    const result = await this.model
      .find({
        name: { $regex: name, $options: 'i' },
      })
      .populate('productLead', 'name email _id')
      .populate('department', 'name _id')
      .populate('companies', 'name _id');
    return result;
  }

  async findOne(id: string) {
    return await this.model
      .findOne({
        _id: id,
      })
      .populate('productLead', 'name email _id')
      .populate('department', 'name _id')
      .populate('companies', 'name _id')
      .orFail(
        new HttpException(APPLICATION_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Applications> {
    return await this.model
      .findOneAndUpdate({ _id: id }, updateApplicationDto, {
        timestamps: true,
        new: true,
      })
      .populate('productLead', 'name email _id')
      .populate('department', 'name _id')
      .populate('companies', 'name _id')
      .orFail(
        new HttpException(APPLICATION_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
  }

  async remove(id: string) {
    return await this.model
      .findOneAndDelete({
        _id: id,
      })
      .populate('productLead', 'name email _id')
      .populate('department', 'name _id')
      .populate('companies', 'name _id')
      .orFail(
        new HttpException(APPLICATION_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
  }
}
