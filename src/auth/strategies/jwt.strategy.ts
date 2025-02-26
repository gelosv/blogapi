import { jwtKey } from '../../config/envs'
import jwt from 'passport-jwt'
import { UserService } from '../../users/user.service'
import { UserAuth } from '../types/userAuth.type'

const service = new UserService()
const Strategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

export const jwtStrategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtKey
}, async function(payload: UserAuth, done) {
  try {
    const { sub } = payload
    const user = await service.getUserById(sub)
    const userAuth = {
      sub,
      name: user.name,
      nickname: user.nickname
    }
    done(null, userAuth)
  } catch (error) {
    done(error, false)
  }
})
