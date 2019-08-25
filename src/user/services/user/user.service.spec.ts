import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from '../../db/user.model'
import { Env } from '../../../../environments/env'

describe('UserService', () => {
  let service: UserService

  beforeEach(async () => {
    const dbConfig = Env.get('database')

    const module: TestingModule = await Test.createTestingModule({
      providers: [ UserService ],
      imports: [
        TypegooseModule.forRoot(`mongodb://${dbConfig.host}:${dbConfig.port.toString()}/${dbConfig.name}`, {
          useNewUrlParser: true,
          useFindAndModify: true
        }),
        TypegooseModule.forFeature([ User ])
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
