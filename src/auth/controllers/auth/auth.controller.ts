import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from '../../services/auth/auth.service'


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post()
  public async login(@Body() payload) {
    return this.authService.sign(payload)
  }
}
