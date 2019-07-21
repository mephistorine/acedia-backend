import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../../../user/services/user/user.service'
import { forkJoin, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { UserDtoObjectedId } from '../../../user/models'
import { JwtPayload } from '../../models'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  public sign(payload) {
    return of(payload).pipe(
      switchMap((payload) => this.userService.getUserByLogin(payload.login)),
      map((user: UserDtoObjectedId) => ({
        uid: user._id.toHexString(),
        token: this.jwtService.sign({ role: user.role, uid: user._id.toHexString() })
      })),
      catchError(error => of(error))
    )
  }

  public validate({ uid, role }: JwtPayload) {
    return forkJoin({
      isExistUser: this.userService.isExistUser({ _id: uid }),
      isRoleMatch: this.userService.isRoleMatch(uid, role)
    })
  }
}
