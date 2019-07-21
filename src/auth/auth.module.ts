import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './controllers/auth/auth.controller'
import { AuthService } from './services/auth/auth.service'

// import { AuthorModule } from '../author/author.module'
import { JwtStrategy } from './services/auth/jwt.strategy'

export const secretOrPrivateKey = '!Ld9SiGzON*pIwLtfp0J'

@Module({
  controllers: [ AuthController ],
  providers: [ AuthService, JwtStrategy ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: '!Ld9SiGzON*pIwLtfp0J',
      signOptions: {
        expiresIn: '1d'
      }
    }),
    AuthorModule
  ],
  exports: [ PassportModule.register({ defaultStrategy: 'jwt' }) ]
})
export class AuthModule {

}
