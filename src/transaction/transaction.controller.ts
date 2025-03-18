import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { TransactionServices } from './transaction.services';

@ApiTags('Transaction') 
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionServices) {}

  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'List of transactions retrieved successfully' })
  @Get('all')
  async getAllTransactions() {
    try {
      const data = await this.transactionService.getAllTransaction();
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Get transaction details by order ID' })
  @ApiParam({ name: 'id_order', required: true, description: 'Order ID' })
  @Get(':id_order/show')
  async getTransactionDetail(@Param('id_order') id_order: number) {
    try {
      const data = await this.transactionService.detailTransaction(id_order);
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Get cart details by cart ID' })
  @ApiParam({ name: 'id_cart', required: true, description: 'Cart ID' })
  @Get('cart/:id_cart')
  async getDetailCart(@Param('id_cart') id_cart: number) {
    try {
      const data = await this.transactionService.detailCart(id_cart);
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Get customer cart by customer ID' })
  @ApiParam({ name: 'id_customer', required: true, description: 'Customer ID' })
  @Get('cart/customer/:id_customer')
  async getCustomerCart(@Param('id_customer') id_customer: number) {
    try {
      const data = await this.transactionService.getCustomerCart(id_customer);
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Add product to cart' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id_customer: { type: 'number' },
        id_product: { type: 'number' },
        quantity: { type: 'integer' }
      },
    },
  })
  @Post('cart/add')
  async addToCart(
    @Body() body: { id_customer: number; id_product: number; quantity: bigint },
  ) {
    try {
      const data = await this.transactionService.addToCart(
        body.id_customer,
        body.id_product,
        body.quantity,
      );
      return data;
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Update cart quantity' })
  @ApiParam({ name: 'id_cart', required: true, description: 'Cart ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quantity: { type: 'integer' }
      },
    },
  })
  @Put('cart/:id_cart/put')
  async updateCartQuantity(
    @Param('id_cart') id_cart: number,
    @Body() body: { quantity: bigint },
  ) {
    try {
      return await this.transactionService.updateCartQuantity(id_cart, body.quantity);
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Delete cart item' })
  @ApiParam({ name: 'id_cart', required: true, description: 'Cart ID' })
  @Delete('cart/:id_cart/delete')
  async deleteCart(@Param('id_cart') id_cart: number) {
    try {
      return await this.transactionService.deleteCart(id_cart);
    } catch (err) {
      return err;
    }
  }

  @ApiOperation({ summary: 'Checkout customer cart' })
  @ApiParam({ name: 'id_customer', required: true, description: 'Customer ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id_customer: { type: 'integer' },
        id_cart: {type: 'integer'}
      },
    },
  })
  @Post('checkout/:id_customer')
  async checkout(@Param('id_customer') id_customer: number) {
    try {
      const data = await this.transactionService.checkout(id_customer);
      return data;
    } catch (err) {
      return err;
    }
  }

  @Get('count')
  async countDataTransactionPending():Promise<any>{
    try {
      const data = await this.transactionService.countDataTransactionPending()
      return data
    } catch (err){
      return err
    }
  }
}
