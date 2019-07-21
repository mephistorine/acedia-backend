import { UserRole } from '../../user/models'

export class JwtPayload {
  role: UserRole
  uid: string
}
