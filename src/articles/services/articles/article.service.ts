import { Injectable } from '@nestjs/common'
import { ArticleDto } from '../../models/articles'
import { from, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { InjectModel } from 'nestjs-typegoose'
import { Article } from '../../db'
import { ModelType } from 'typegoose'
import { Document } from 'mongoose'

@Injectable()
export class ArticleService {
  constructor(@InjectModel(Article) private articleModel: ModelType<ArticleDto>) {}

  public create(articleDto: ArticleDto) {
    return of(articleDto).pipe(
      map((article) => new this.articleModel(article)),
      map((articleModelDocument: Document) => articleModelDocument.toObject({ versionKey: false })),
      catchError(error => of(error))
    )
  }

  public getById(id: string) {
    return from(this.articleModel.findById(id).lean()).pipe(
      catchError(error => of(error))
    )
  }

  public getBySlug(slug: string) {
    return from(this.articleModel.findOne({ slug }).lean()).pipe(
      catchError(error => of(error))
    )
  }

  public getByAuthorId(articleId: string, authorId: string) {
    return from(this.articleModel.findOne({ _id: articleId, author: authorId }).lean()).pipe(
      catchError(error => of(error))
    )
  }

  public getByTag(tagId: string) {

  }

  public getAll() {
    return from(this.articleModel.find().lean()).pipe(
      catchError(error => of(error))
    )
  }

  public deleteById(id: string) {
    return from(this.articleModel.findByIdAndDelete(id)).pipe(
      catchError(error => of(error))
    )
  }

  public updateById(id: string, articleDto: Partial<ArticleDto>) {
    return from(this.articleModel.findOneAndUpdate(id, { $set: articleDto }, { new: true })).pipe(
      catchError(error => of(error))
    )
  }
}
