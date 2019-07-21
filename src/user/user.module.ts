import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { UserController } from './controllers/user.controller'
import { User } from './db/user.model'
import { UserService } from './services/user/user.service'

@Module({
  controllers: [ UserController ],
  imports: [ TypegooseModule.forFeature([ User ]) ],
  providers: [ UserService ],
  exports: [ TypegooseModule.forFeature([ User ]), UserService ]
})
export class UserModule {}
