import { arrayProp, prop, Ref, Typegoose } from 'typegoose'
import { User } from '../../user/db/user.model'
import { getCurrentTime } from '../../shared/util'

export class Article extends Typegoose {
  @prop({
    unique: true,
    lowercase: true,
    required: true
  })
  slug: string

  @prop({ default: getCurrentTime() })
  createdAt: number

  @prop({ required: true })
  title: string

  @prop()
  poster: string

  @prop()
  content: string

  // @arrayProp({
  //   itemsRef: Tag
  // })
  // tags: Ref<Tag>[]

  @prop({ ref: User })
  author: Ref<User>

  @prop({ default: getCurrentTime() })
  updateAt: number
}
