import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TransactionEntity, OrderStatus } from './transaction.entity';
import { CartEntity } from './transaction-cart.entity';
import { CustomerEntity } from 'src/customer/customer.entity';
import { ProductEntity } from 'src/product/product.entity';

@Injectable()
export class TransactionServices {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,

    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async getAllTransaction(): Promise<any> {
    try {
      const data = await this.transactionRepository.find({
        relations: ['customer', 'product'],
      });
      return { data, statusCode: HttpStatus.OK };
    } catch (err) {
      return err;
    }
  }

  async detailTransaction(id_order: number): Promise<any> {
    try {
      const data = await this.transactionRepository.findOne({
        where: { id_order },
        relations: ['customer', 'product'],
      });

      if (!data) {
        return { message: 'Not Found', statusCode: HttpStatus.BAD_REQUEST };
      }

      return { data, statusCode: HttpStatus.OK };
    } catch (err) {
      return err;
    }
  }
  async detailCart(id_cart: number): Promise<any> {
    try {
      const data = await this.cartRepository.findOne({
        where: { id_cart },
        relations: ['customer', 'product'],
      });

      if (!data) {
        return { message: 'Not Found', statusCode: HttpStatus.BAD_REQUEST };
      }

      return { data, statusCode: HttpStatus.OK };
    } catch (err) {
      return err;
    }
  }

  async getCustomerCart(id_customer: number): Promise<any> {
    try {
      const data = await this.cartRepository.find({
        where: { customer: { id_customer } },
        relations: ['customer', 'product'],
      });

      if (!data) {
        return { message: 'Not Found', statusCode: HttpStatus.BAD_REQUEST };
      }

      return { data, statusCode: HttpStatus.OK };
    } catch (err) {
      return err;
    }
  }

  async addToCart(
    id_customer: number,
    id_product: number,
    quantity: bigint,
  ): Promise<any> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id_customer },
      });
      const product = await this.productRepository.findOne({
        where: { id_product },
      });

      if (!customer || !product) {
        return {
          message: 'Customer or Product not found',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }

      const total_price = product.product_price * quantity;

      const cartItem = this.cartRepository.create({
        customer,
        product,
        quantity,
        total_price,
      });

      await this.cartRepository.save(cartItem);

      return {
        message: 'Added to cart',
        data: cartItem,
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      return err;
    }
  }

  async updateCartQuantity(id_cart: number, quantity: bigint): Promise<any> {
    try {
      const cartItem = await this.cartRepository.findOne({
        where: { id_cart },
      });

      if (!cartItem) {
        return {
          message: 'Cart item not found',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }

      const product = await this.productRepository.findOne({
        where: { id_product: cartItem.product.id_product },
      });
      if (!product) {
        return {
          message: 'Product not found',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }

      cartItem.quantity = quantity;
      cartItem.total_price = product.product_price * BigInt(quantity);

      await this.cartRepository.save(cartItem);

      return {
        message: 'Cart quantity updated',
        data: cartItem,
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      return err;
    }
  }

  async deleteCart(id_cart: number): Promise<any> {
    try {
      const cartItem = await this.cartRepository.findOne({
        where: { id_cart },
      });

      if (!cartItem) {
        return {
          message: 'Cart item not found',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }

      await this.cartRepository.remove(cartItem);

      return {
        message: 'Cart item deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      return err;
    }
  }

  async checkout(id_customer: number, id_cart?: number[]): Promise<any> {
    try {
        let cartItems: any[] = [];

        if (id_cart && id_cart.length > 0) {
            // Ambil semua cart items berdasarkan id_cart yang diberikan
            cartItems = await this.cartRepository.find({
                where: { id_cart: In(id_cart), customer: { id_customer } }, // In() untuk filter lebih dari 1 ID
                relations: ['product', 'customer'],
            });
        } else {
            // Jika id_cart tidak dikirim, ambil semua cart milik customer
            cartItems = await this.cartRepository.find({
                where: { customer: { id_customer } },
                relations: ['product', 'customer'],
            });
        }

        if (cartItems.length === 0) {
            return {
                message: 'Cart is empty or items not found',
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        const failedItems: any[] = [];

        for (const cart of cartItems) {
            const product = await this.productRepository.findOne({
                where: { id_product: cart.product.id_product },
            });

            if (!product || product.product_qty < cart.quantity) {
                failedItems.push({
                    product_name: product?.product_name || 'Unknown',
                    message: 'Insufficient stock',
                });
                continue;
            }

            // Kurangi stok produk
            product.product_qty -= cart.quantity;
            await this.productRepository.save(product);

            // Simpan transaksi
            const order = this.transactionRepository.create({
                customer: cart.customer,
                product: cart.product,
                quantity: cart.quantity,
                total_price: cart.total_price,
                status: OrderStatus.PENDING,
            });

            await this.transactionRepository.save(order);
            await this.cartRepository.remove(cart);
        }

        if (failedItems.length > 0) {
            return {
                message: 'Some items could not be checked out due to insufficient stock',
                failedItems,
                statusCode: HttpStatus.BAD_REQUEST,
            };
        }

        return { message: 'Checkout successful', statusCode: HttpStatus.OK };
    } catch (err) {
        return {
            message: 'An error occurred during checkout',
            error: err.message,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        };
    }
}


  async countDataTransactionPending(): Promise<any> {
    try {
      const data = await this.transactionRepository.count();
      const dataCustomer = await this.customerRepository.count();
      return {
        data: {
          data_transaksi: data,
          data_customer: dataCustomer,
        },
      };
    } catch (err) {
      return err;
    }
  }
}
