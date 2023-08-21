import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Header,
    HttpCode,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { ApiOkResponse } from '@nestjs/swagger';
// import { AuthGuard } from 'src/authorization/auth.guard';


@Controller('user')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get()
    @ApiOkResponse({ type: UserEntity })
    // @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(): Promise<UserEntity[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updatePasswordDto: UpdatePasswordDto,
    ) {
        return this.usersService.update(id, updatePasswordDto);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
