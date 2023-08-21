import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entity/user.entity';
import { AuthHelper } from './auth.helper';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        JwtModule.register({
            // global: true,
            secret: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthHelper,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [AuthHelper],
})
export class AuthModule {}
