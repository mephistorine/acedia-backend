import { Module } from '@nestjs/common'
import { ArticlesController } from './controllers/articles/articles.controller'
import { ArticleService } from './services/articles/article.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { Article } from './db'

@Module({
  controllers: [ ArticlesController ],
  providers: [ ArticleService ],
  imports: [ TypegooseModule.forFeature([ Article ]) ]
})
export class ArticlesModule {}
