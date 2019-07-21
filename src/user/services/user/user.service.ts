import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ModelType } from 'typegoose'
import { from, Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { hashSync } from 'bcrypt'
import { Document } from 'mongoose'

import { UserDto } from '../../models'
import { User } from '../../db/user.model'
import { getCurrentTime } from '../../../shared/util'

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: ModelType<UserDto>) {
  }

  public create(userDto: UserDto): Observable<Partial<UserDto>> {
    return of(userDto).pipe(
      map((user) => ({ ...user, password: hashSync(user.password, 10) })),
      map((user) => new this.userModel(user)),
      switchMap((userModel) => from(userModel.save()).pipe(
        map((userSavedModel: Document) => userSavedModel.toObject({ versionKey: false })),
        map((user: UserDto) => {
          const { password, ...filtered } = user
          return filtered
        })
      )),
      catchError((error) => of(error))
    )
  }

  public getUserById(id: string) {
    return from(this.userModel.findById(id).select('-password -__v').lean())
  }

  public getAll() {
    return from(this.userModel.find().select('-password -__v').lean())
  }

  public updateUserById(id: string, userDto: Partial<UserDto>) {
    return from(this.userModel.findOneAndUpdate(id, { $set: { ...userDto, updatedAt: getCurrentTime() } }, { new: true })).pipe(
      catchError(error => of(error))
    )
  }

  public deleteUserById(id: string) {
    return from(this.userModel.findByIdAndDelete(id)).pipe(
      catchError(error => of(error))
    )
  }
}
