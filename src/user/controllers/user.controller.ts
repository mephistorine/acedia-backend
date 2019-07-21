import { Body, Controller, Post, UsePipes, Get, Param, Patch, Delete } from '@nestjs/common'
import { UserService } from '../services/user/user.service'
import { UserDto } from '../models'
import { ValidationPipe } from '../../shared/pipes'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post()
  @UsePipes(ValidationPipe)
  public create(@Body() userDto: UserDto) {
    return this.userService.create(userDto)
  }

  @Get()
  public getAll() {
    return this.userService.getAll()
  }

  @Get(':id')
  public get(@Param('id') id: string) {
    return this.userService.getUserById(id)
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  public update(@Param('id') id: string, @Body() userDto: Partial<UserDto>) {
    return this.userService.updateUserById(id, userDto)
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.userService.deleteUserById(id)
  }
}
