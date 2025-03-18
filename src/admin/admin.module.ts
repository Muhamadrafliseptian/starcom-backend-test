import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AdminEntity } from './admin.entity';
import { AdminController } from './admin.controller';
import { AdminServices } from './admin.services';

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'starcom_test',
      signOptions: { expiresIn: '1h' }, 
    }), 
    ConfigModule.forRoot()],
    controllers: [AdminController],
    providers: [AdminServices],
})
export class AdminModule { }
