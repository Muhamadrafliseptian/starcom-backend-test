import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CustomerServices {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private jwtService: JwtService,
  ) {}

  async getAllUser(): Promise<any> {
    try {
      const dataUser = await this.customerRepository.find();
      return { data: dataUser, statusCode: HttpStatus.OK };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async detailUser(id_customer: number): Promise<any> {
    try {
      const userData = await this.customerRepository.findOne({
        where: { id_customer },
      });

      if (!userData) {
        return { message: 'User not found', statusCode: HttpStatus.NOT_FOUND };
      }
      return { data: userData, statusCode: HttpStatus.OK };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async createUser(params: any): Promise<any> {
    const { email, name, password, customer_code, age, phone_number } = params;

    const existingUser = await this.customerRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.customerRepository.create({
      email,
      name,
      password,
      customer_code,
      age,
      phone_number,
    });
    await this.customerRepository.save(newUser);

    return {
      message: 'User registered successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async login(params: any): Promise<any> {
    const { email, password } = params;

    const user = await this.customerRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = this.jwtService.sign({
      id: user.id_customer,
      email: user.email,
    });

    return {
      message: 'Login successful',
      data: {
        email: user.email,
        name: user.name,
        age: user.age,
        customer_code: user.customer_code,
        phone_number: user.phone_number,
      },
      token,
    };
  }

  async updateUser(id_customer: number, params: any): Promise<any> {
    try {
      const user = await this.customerRepository.findOne({
        where: { id_customer },
      });

      if (!user) {
        return {
          message: 'User not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      await this.customerRepository.update(id_customer, params);
      const updatedUser = await this.customerRepository.findOne({
        where: { id_customer },
      });

      return {
        message: 'User updated successfully',
        statusCode: HttpStatus.OK,
        data: updatedUser,
      };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }
}
