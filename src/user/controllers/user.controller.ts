import { Body, Controller, Post, UsePipes, Get, Param, Patch, Delete, ValidationPipe, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user/user.service'
import { UserDto } from '../models'
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
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
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  public update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.updateUserById(id, userDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public delete(@Param('id') id: string) {
    return this.userService.deleteUserById(id)
  }
}
