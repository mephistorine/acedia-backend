import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { TypegooseModule } from 'nestjs-typegoose'
import { Env } from '../environments/env'

const dbConfig = Env.get('database')

@Module({
  imports: [
    UserModule,
    TypegooseModule.forRoot(`mongodb://${dbConfig.host}:${dbConfig.port.toString()}/${dbConfig.name}`, {
      useNewUrlParser: true,
      useFindAndModify: true
    })
  ],
  controllers: [ AppController ]
})
export class AppModule {}
