import { IsArray, IsEmail, IsEnum, IsString, IsUrl, MinLength, IsEmpty } from 'class-validator'
import { getCurrentTime } from '../../shared/util'

export enum Role {
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

  @IsString()
  bio: string

  @IsEnum(Role)
  role: Role

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
