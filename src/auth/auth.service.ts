import { PrismaClient } from '@prisma/client'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import { User } from './types/user.type'
import jwt from 'jsonwebtoken'
import { jwtKey } from '../config/envs'
import { UserLogin } from './types/userLogin.type'

export class AuthService {
  private readonly prisma = new PrismaClient()

  setToken(data: {sub: number, name: string, nickname: string}) {
    const token = jwt.sign(data, jwtKey, { expiresIn: '2h' });
    return token
  }

  async registerUser(user: User) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        nickname: user.nickname
      },
      select: {
        id: true
      }
    })

    if(userExists) {
      throw boom.badRequest('Nickname ya existe')
    }

    const newPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        password: newPassword
      }
    })

    const dataToken = {
      sub: newUser.id,
      nickname: newUser.nickname,
      name: newUser.name
    }

    return {
      ...dataToken,
      authToken: this.setToken(dataToken)
    }
  }

  async loginUser(user: UserLogin) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        nickname: user.nickname
      }
    })

    if(!userExists) throw boom.unauthorized('Credenciales incorrectas')

    const isSamePassword = await bcrypt.compare(user.password, userExists.password)

    if(!isSamePassword) throw boom.unauthorized('Credenciales incorrectas');

    const dataToken = {
      sub: userExists.id,
      nickname: userExists.nickname,
      name: userExists.name
    }

    return {
      ...dataToken,
      authToken: this.setToken(dataToken)
    }

  }
}
