import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDepartmentsDto } from './dto/create-department.dto';
import { UpdateDepartmentsDto } from './dto/update-departments.dto';
import { Departments } from './entities/departments.entity';

const DEPARTMENT_NOT_FOUND_MESSAGE = 'Department not found';
const DEPARTMENT_ALREADY_EXISTS_MESSAGE = 'Department Already Exists';

@Injectable({ scope: Scope.REQUEST })
export class DepartmentsService {
  constructor(
    @InjectModel(Departments.name)
    private readonly model: Model<Departments>,
  ) {}

  async create(
    createDepartmentsDto: CreateDepartmentsDto,
  ): Promise<Departments> {
    try {
      const department = new this.model(createDepartmentsDto);
      return await department.save();
    } catch (error: any) {
      if (error.code == '11000') {
        throw new HttpException(
          DEPARTMENT_ALREADY_EXISTS_MESSAGE,
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
    const department = await this.model
      .findOne({ _id: id })
      .orFail(
        new HttpException(DEPARTMENT_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
    return department;
  }

  async findByName(name?: string) {
    const result = await this.model.find({
      name: { $regex: name, $options: 'i' },
    });
    return result;
  }

  async update(
    id: string,
    updateDepartmentsDto: UpdateDepartmentsDto,
  ): Promise<Departments> {
    let department;
    try {
      department = await this.model.findOne({ _id: id });
      const { name, status } = updateDepartmentsDto;
      department.name = name;
      department.status = status;
      await department.save();
      return department;
    } catch (error) {
      if (error.code == '11000') {
        throw new HttpException(
          DEPARTMENT_ALREADY_EXISTS_MESSAGE,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        DEPARTMENT_NOT_FOUND_MESSAGE,
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
        new HttpException(DEPARTMENT_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND),
      );
  }
}
