import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Like, Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProductServices {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getProduct(): Promise<any> {
    try {
      const productData = await this.productRepository.find();
      return { data: productData, statusCode: HttpStatus.OK };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async searchProduct(query: string): Promise<any> {
    try {
      const data = await this.productRepository.find({
        where: [
          { product_name: Like(`%${query}%`) },
          { product_description: Like(`%${query}%`) },
        ],
      });

      console.log('====================================');
      console.log(query);
      console.log('====================================');

      if (data.length === 0) {
        return { message: 'No products found', statusCode: HttpStatus.NOT_FOUND };
      }

      return { data, statusCode: HttpStatus.OK };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async detailProduct(id_product: number): Promise<any> {
    try {
      const productData = await this.productRepository.findOne({
        where: { id_product },
      });

      if (!productData) {
        return { message: 'Product not found', statusCode: HttpStatus.NOT_FOUND };
      }
      return { data: productData, statusCode: HttpStatus.OK };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async createProduct(productDto: { product_name: string; product_qty: number; product_price: bigint, product_description: string }): Promise<any> {
    try {
      const newProduct = this.productRepository.create(productDto);
      await this.productRepository.save(newProduct);
      return { message: 'Product created successfully', statusCode: HttpStatus.CREATED, data: newProduct };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async updateProduct(id_product: number, updateDto: { product_name?: string; product_qty?: number; product_price?: bigint }): Promise<any> {
    try {
      const product = await this.productRepository.findOne({ where: { id_product } });

      if (!product) {
        return { message: 'Product not found', statusCode: HttpStatus.NOT_FOUND };
      }

      await this.productRepository.update(id_product, updateDto);
      const updatedProduct = await this.productRepository.findOne({ where: { id_product } });

      return { message: 'Product updated successfully', statusCode: HttpStatus.OK, data: updatedProduct };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async deleteProduct(id_product: number): Promise<any> {
    try {
      const product = await this.productRepository.findOne({ where: { id_product } });

      if (!product) {
        return { message: 'Product not found', statusCode: HttpStatus.NOT_FOUND };
      }

      await this.productRepository.delete(id_product);
      return { message: 'Product deleted successfully', statusCode: HttpStatus.OK };
    } catch (err) {
      return { message: err.message, statusCode: HttpStatus.BAD_REQUEST };
    }
  }
}
