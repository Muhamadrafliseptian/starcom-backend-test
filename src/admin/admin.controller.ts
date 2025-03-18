import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { AdminServices } from './admin.services';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminServices: AdminServices) {}

  @ApiOperation({ summary: 'Get all admin' })
  @ApiResponse({
    status: 200,
    description: 'List of admin retrieved successfully',
  })
  @Get('all')
  async getAllUser(): Promise<any> {
    try {
      const data = await this.adminServices.getAllUser();
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Admin ID' })
  @Get(':id/show')
  async getCustomerById(@Param('id') id: number): Promise<any> {
    try {
      const data = await this.adminServices.detailUser(id);
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Create a new admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        admin_code: { type: 'string' },
        password: { type: 'string' },
        phone_number: { type: 'string' },
      },
    },
  })
  @Post('post')
  async createCustomer(@Body() params: any): Promise<any> {
    try {
      const data = await this.adminServices.createUser(params);
      return data;
    } catch (err) {
      return err;
    }
  }
  @ApiOperation({ summary: 'Login an admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  async login(@Body() body: any) {
    return this.adminServices.login(body);
  }

  @ApiOperation({ summary: 'Update customer data' })
  @ApiParam({ name: 'id', required: true, description: 'Customer ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', nullable: true },
        email: { type: 'string', format: 'email', nullable: true },
        admin_code: { type: 'string', nullable: true },
        password: { type: 'string', nullable: true },
        phone_number: { type: 'string', nullable: true },
      },
    },
  })
  @Put(':id/put')
  async updateCustomer(
    @Param('id') id: number,
    @Body() params: any,
  ): Promise<any> {
    try {
      const data = await this.adminServices.updateUser(id, params);
      return data;
    } catch (err) {
      return err;
    }
  }
}
