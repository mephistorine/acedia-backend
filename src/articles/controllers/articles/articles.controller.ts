import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { ArticleDto } from '../../models/articles'
import { ArticleService } from '../../services/articles/article.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('articles')
export class ArticlesController {

  constructor(private articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  public create(@Body() articleDto: ArticleDto) {
    return this.articleService.create(articleDto)
  }

  @Get()
  public getAll() {
    return this.articleService.getAll()
  }

  @Get(':id')
  public get(@Param('id') id: string) {
    return this.articleService.getById(id)
  }

  @Get(':articleId/author/:authorId')
  public getByAuthor(@Param('articleId') articleId: string,
                     @Param('authorId') authorId: string) {
    return this.articleService.getByAuthorId(articleId, authorId)
  }

  @Get('slug/:slug')
  public getBySlug(@Param('slug') slug: string) {
    return this.articleService.getBySlug(slug)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  public update(@Param('id') id: string, @Body() articleDto: Partial<ArticleDto>) {
    return this.articleService.updateById(id, articleDto)
  }

  @Delete('id')
  @UseGuards(AuthGuard('jwt'))
  public delete(@Param('id') id: string) {
    return this.articleService.deleteById(id)
  }

}
