import { Typegoose, prop } from 'typegoose'
import { Role } from '../models'
import { getCurrentTime } from '../../shared/util'

class Social {

  @prop()
  name: string

  @prop()
  slug: string

  @prop()
  url: string
}

export class User extends Typegoose {
  @prop({ required: true })
  name: string

  @prop({ required: true })
  lastName: string

  @prop({ default: '' })
  bio: string

  @prop({
    enum: Role,
    required: true
  })
  role: Role

  @prop({
    unique: true,
    lowercase: true,
    required: true
  })
  login: string

  @prop()
  website?: string

  @prop({
    required: true,
    unique: true
  })
  email: string

  @prop()
  passwordHashed: string

  @prop({
    required: true
  })
  password: string

  @prop()
  location?: string

  @prop({
    default: []
  })
  socials: Social[]

  @prop({
    default: getCurrentTime()
  })
  createdAt: number

  @prop({
    default: getCurrentTime()
  })
  updatedAt: number
}
