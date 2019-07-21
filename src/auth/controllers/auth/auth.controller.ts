import { Controller, Post, Body, Res } from '@nestjs/common'
import { ApiOperation, ApiUseTags } from '@nestjs/swagger'
import { Response } from 'express'

import { JwtPayloadDTO } from '../../models/auth'
import { AuthService } from '../../services/auth/auth.service'

@ApiUseTags('auth-controller')
@Controller('auth')
export class AuthController {

  constructor(private authS: AuthService) {

  }

  @ApiOperation({ title: 'Авторизоваться' })
  @Post()
  public async login(@Body() payload: JwtPayloadDTO, @Res() response: Response) {
    const signData = await this.authS.sign(payload)

    if (signData.success) {
      response.json(signData.data)
    } else {
      response.status(signData.error.code).json(signData.error)
    }
  }
}
