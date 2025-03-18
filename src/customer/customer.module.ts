import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { CustomerEntity } from './customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerServices } from './customer.services';

@Module({
    imports: [TypeOrmModule.forFeature([CustomerEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'starcom_test',
      signOptions: { expiresIn: '1h' }, 
    }), 
    ConfigModule.forRoot()],
    controllers: [CustomerController],
    providers: [CustomerServices],
})
export class CustomerModule { }
