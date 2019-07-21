import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Env } from '../environments/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(Env.get('server').port)
}
bootstrap()
