import { IsEmpty, IsInstance, IsString, IsUrl, Matches, ValidateNested } from 'class-validator'
import { UserDto } from '../../user/models'

export class ArticleDto {

  @IsString()
  @Matches(/^[a-z0-9_-]/)
  public slug: string

  @IsEmpty()
  public createdAt: string

  @IsEmpty()
  public updatedAt: string

  @IsString()
  public title: string

  @IsString()
  @IsUrl()
  public poster: string

  @IsString()
  public content: string

  @IsInstance(UserDto)
  @ValidateNested()
  public author: UserDto

}
