import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ProductServices } from './product.services';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productServices: ProductServices) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products retrieved successfully' })
  @Get('all')
  async getProducts(): Promise<any> {
    try {
      return await this.productServices.getProduct();
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  @ApiOperation({ summary: 'Search product by name' })
  @ApiQuery({ name: 'query', required: true, description: 'Product name to search' })
  @Get('search')
  async searchProduct(@Query('query') query: string): Promise<any> {
    try {
      return await this.productServices.searchProduct(query);
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @Get(':id/show')
  async getProductById(@Param('id') id: number): Promise<any> {
    try {
      return await this.productServices.detailProduct(id);
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        product_name: { type: 'string' },
        product_qty: { type: 'number' },
        product_price: { type: 'integer', format: 'int64' },
        product_description: { type: 'string' },
      },
    },
  })
  @Post('post')
  async createProduct(
    @Body()
    body: {
      product_name: string;
      product_qty: number;
      product_price: bigint;
      product_description: string;
    },
  ): Promise<any> {
    try {
      return await this.productServices.createProduct(body);
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  @ApiOperation({ summary: 'Update product' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        product_name: { type: 'string', nullable: true },
        product_qty: { type: 'number', nullable: true },
        product_price: { type: 'integer', format: 'int64', nullable: true },
        product_description: { type: 'string', nullable: true },
      },
    },
  })
  @Put(':id/put')
  async updateProduct(
    @Param('id') id: number,
    @Body()
    body: {
      product_name?: string;
      product_qty?: number;
      product_price?: bigint;
      product_description?: string;
    },
  ): Promise<any> {
    try {
      return await this.productServices.updateProduct(id, body);
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  @ApiOperation({ summary: 'Delete product' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @Delete(':id/delete')
  async deleteProduct(@Param('id') id: number): Promise<any> {
    try {
      return await this.productServices.deleteProduct(id);
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }
}
