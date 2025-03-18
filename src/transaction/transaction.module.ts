import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionEntity } from './transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionServices } from './transaction.services';
import { CartEntity } from './transaction-cart.entity';
import { CustomerEntity } from 'src/customer/customer.entity';
import { ProductEntity } from 'src/product/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TransactionEntity, CartEntity, CustomerEntity, ProductEntity]), ConfigModule.forRoot()],
    controllers: [TransactionController],
    providers: [TransactionServices],
})
export class TransactionModule { }
