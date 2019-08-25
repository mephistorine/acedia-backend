import { IsArray, IsEmail, IsEnum, IsString, IsUrl, MinLength, IsEmpty, IsOptional } from 'class-validator'
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

export class UserDto {
  @IsString()
  name: string

  @IsString()
  lastName: string

  @IsOptional()
  @IsString()
  bio: string

  @IsEnum(UserRole)
  role: UserRole

  @IsString()
  @MinLength(2)
  login: string

  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsOptional()
  @IsString()
  location?: string

  @IsArray()
  socials: Social[]

  @IsEmpty()
  createdAt: number

  @IsEmpty()
  updatedAt: number
}
