import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { CustomerEntity } from './customer/customer.entity';
import { TransactionEntity } from './transaction/transaction.entity';
import { CustomerModule } from './customer/customer.module';
import { TransactionModule } from './transaction/transaction.module';
import { CartEntity } from './transaction/transaction-cart.entity';
import { AdminEntity } from './admin/admin.entity';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'db_starcom_test',
        entities: [ProductEntity, CustomerEntity, TransactionEntity, CartEntity, AdminEntity],
        synchronize: true,
      }),
    }),
    ProductModule,
    CustomerModule,
    TransactionModule,
    AdminModule
  ],
})
export class AppModule { }