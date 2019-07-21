import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Env } from '../environments/env'
import { NestExpressApplication } from '@nestjs/platform-express'

import * as morgan from 'morgan'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const serverEnv = Env.get('server')
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })

  app.use(morgan('dev'))

  const options = new DocumentBuilder()
    .setTitle('Acedia API')
    .setDescription('REST API for Acedia app')
    .setContactEmail('stylesam@yandex.ru')
    .setVersion(Env.get('appVersion').version)
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  const swaggerPath = 'api-doc'

  SwaggerModule.setup(swaggerPath, app, document)

  console.log(`Swagger doc started on http://${serverEnv.host}:${serverEnv.port}/${swaggerPath}`)

  await app.listen(serverEnv.port)
}
bootstrap()
