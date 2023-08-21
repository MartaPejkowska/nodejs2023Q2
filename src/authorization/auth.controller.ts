import {
    Body,
    Controller,
    Inject,
    Post,
    ClassSerializerInterceptor,
    UseInterceptors,
    UseGuards,
    Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
// import { JwtAuthGuard } from './auth.guard';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './public.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService;

    @Public()
    @Post('signup')
    register(@Body() body: CreateUserDto): Promise<Partial<UserEntity> | never> {
        return this.authService.register(body);
    }

    @Public()
    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    private login(@Body() body: CreateUserDto) {
        return this.authService.login(body);
    }

    @Public()
    @Post('refresh')
    @UseInterceptors(ClassSerializerInterceptor)
    private refresh(@Req() refreshToken: Request) {
        return this.authService.refresh(refreshToken);
    }
}
