import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { of } from 'rxjs'
import { take, tap, map, switchMap, catchError, mapTo } from 'rxjs/operators'
import { getCurrentTime } from '../../../shared/util'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      secretOrKey: '!Ld9SiGzON*pIwLtfp0J',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  public validate(payload) {
    of(payload).pipe(
      take(1),
      map((payload) => {
        if (payload.exp > getCurrentTime()) return payload
        throw new UnauthorizedException('Token has expired')
      }),
      switchMap((payload) => this.authService.validate(payload).pipe(
        tap(({ isExistUser, isRoleMatch }) => {

          if (!(isExistUser && isRoleMatch)) {
            throw new UnauthorizedException('User does not exist or role does not match')
          }
        }),
        mapTo(payload)
      )),
      catchError((error) => of(error))
    ).subscribe()

    return payload
  }
}
