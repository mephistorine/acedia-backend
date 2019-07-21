import { IsArray, IsEmail, IsEnum, IsString, IsUrl, MinLength, IsEmpty } from 'class-validator'
import { getCurrentTime } from '../../shared/util'
import { ObjectId } from 'bson'

export enum UserRole {
  admin = 'ADMIN'
}

export class Social {

  @IsString()
  name: string

  @IsString()
  slug: string

  @IsString()
  @IsUrl()
  url: string
}

export interface WithObjectId {
  _id: ObjectId
}

export interface WithStringifyObjectId {
  _id: string
}

export class UserDto {
  @IsString()
  name: string

  @IsString()
  lastName: string

  @IsString()
  bio: string

  @IsEnum(UserRole)
  role: UserRole

  @IsString()
  @MinLength(2)
  login: string

  @IsString()
  @IsUrl()
  website?: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsString()
  location?: string

  @IsArray()
  socials: Social[]

  @IsEmpty()
  createdAt: number

  @IsEmpty()
  updatedAt: number
}

export type UserDtoObjectedId = UserDto & WithObjectId
export type UserDtoStringifyId = UserDto & WithStringifyObjectId
