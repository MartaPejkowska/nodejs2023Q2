import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/User.interface';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ){
    return this.usersService.update(id, updatePasswordDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.usersService.delete(id)
  }
}
