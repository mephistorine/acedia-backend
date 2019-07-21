import { Typegoose, prop } from 'typegoose'
import { UserRole } from '../models'
import { getCurrentTime } from '../../shared/util'
import { ObjectId } from 'bson'

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
    enum: UserRole,
    required: true
  })
  role: UserRole

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
