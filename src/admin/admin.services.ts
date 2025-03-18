import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminEntity } from './admin.entity';
@Injectable()
export class AdminServices {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly customerRepository: Repository<AdminEntity>,
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

  async detailUser(id_admin: number): Promise<any> {
    try {
      const userData = await this.customerRepository.findOne({
        where: { id_admin },
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
    const { email, name, password, admin_code , phone_number} = params;

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
      admin_code,
      phone_number
    });
    await this.customerRepository.save(newUser);

    return {
      message: 'Admin registered successfully',
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
      id: user.id_admin,
      email: user.email,
    });

    return {
      message: 'Login successful',
      data: {
        id_admin: user.id_admin,
        email: user.email,
        name: user.name,
        admin_code: user.admin_code,
        phone_number: user.phone_number,
      },
      token,
    };
  }

  async updateUser(id_admin: number, params: any): Promise<any> {
    try {
      const user = await this.customerRepository.findOne({
        where: { id_admin },
      });

      if (!user) {
        return {
          message: 'Product not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }

      await this.customerRepository.update(id_admin, params);
      const updatedUser = await this.customerRepository.findOne({
        where: { id_admin },
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
