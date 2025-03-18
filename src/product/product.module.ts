import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductEntity } from './product.entity';
import { ProductController } from './product.controller';
import { ProductServices } from './product.services';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity]), ConfigModule.forRoot()],
    controllers: [ProductController],
    providers: [ProductServices],
})
export class ProductModule { }
