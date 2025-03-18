import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CustomerServices } from './customer.services';

@ApiTags('Customer') 
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerServices: CustomerServices) {}

  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({ status: 200, description: 'List of customers retrieved successfully' })
  @Get('all')
  async getAllUser(): Promise<any> {
    try {
      const data = await this.customerServices.getAllUser();
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Customer ID' })
  @Get(':id/show')
  async getCustomerById(@Param('id') id: number): Promise<any> {
    try {
      const data = await this.customerServices.detailUser(id);
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        customer_code: { type: 'string' },
        age: { type: 'string' },
        password: { type: 'string' },
        phone_number: { type: 'string' },
      },
    },
  })

  @Post('post')
  async createCustomer(@Body() params: any): Promise<any> {
    try {
      const data = await this.customerServices.createUser(params);
      return data;
    } catch (err) {
      return err;
    }
  }
  @ApiOperation({ summary: 'Login a customer' })
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
    return this.customerServices.login(body);
  }

  @ApiOperation({ summary: 'Update customer data' })
  @ApiParam({ name: 'id', required: true, description: 'Customer ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', nullable: true },
        email: { type: 'string', format: 'email', nullable: true },
        customer_code: { type: 'string', nullable: true },
        age: { type: 'string', nullable: true },
        password: { type: 'string', nullable: true },
        phone_number: { type: 'string' },
      },
    },
  })
  @Put(':id/put')
  async updateCustomer(
    @Param('id') id: number,
    @Body() params: any,
  ): Promise<any> {
    try {
      const data = await this.customerServices.updateUser(id, params);
      return data;
    } catch (err) {
      return err;
    }
  }
}
