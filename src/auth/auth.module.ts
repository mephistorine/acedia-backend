import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './controllers/auth/auth.controller'
import { AuthService } from './services/auth/auth.service'

import { JwtStrategy } from './services/auth/jwt.strategy'
import { UserModule } from '../user/user.module'

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService, JwtStrategy ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: '!Ld9SiGzON*pIwLtfp0J',
      signOptions: {
        expiresIn: '1d'
      }
    }),
    UserModule
  ],
  exports: [ PassportModule.register({ defaultStrategy: 'jwt' }) ]
})
export class AuthModule {

}
