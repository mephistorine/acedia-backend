import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// import { AuthorService } from '../../../author/services/author/author.service'
import { JwtPayloadDTO } from 'src/auth/models/auth'
import { isEmptyObject } from 'src/shared/util'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private authorS: AuthorService) {}

  public async sign(payload: JwtPayloadDTO): Promise<SignData> {
    const author = await this.validateAuthor(payload.nick)

    if (isEmptyObject(author)) {
      return {
        success: false,
        error: {
          code: 400,
          message: 'This author does not exist'
        }
      }
    }

    const isRoleMatched = await this.authorS.checkRole(author, payload.role)

    if (!isRoleMatched) {
      return {
        success: false,
        error: {
          code: 400,
          message: 'Role does not match'
        }
      }
    }

    const isPassMatched = await this.authorS.checkPassword(author, payload.password)

    if (!isPassMatched) {
      return {
        success: false,
        error: {
          code: 400,
          message: 'Password does not match'
        }
      }
    }

    return {
      success: true,
      data: { accessToken: this.jwtService.sign(payload) }
    }
  }

  public async validateAuthor(nick: string) {
    return await this.authorS.getByNick(nick)
  }
}

interface SignData {
  success: boolean
  data?: any
  error?: {
    code?: number
    message?: string
  }
}
