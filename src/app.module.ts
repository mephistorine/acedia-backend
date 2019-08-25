import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { Env } from '../environments/env'
import { UserModule, AuthModule, ArticlesModule } from './modules'

const dbConfig = Env.get('database')

@Module({
  imports: [
    UserModule,
    TypegooseModule.forRoot(`mongodb://${dbConfig.host}:${dbConfig.port.toString()}/${dbConfig.name}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    }),
    AuthModule,
    ArticlesModule
  ]
})
export class AppModule {}
