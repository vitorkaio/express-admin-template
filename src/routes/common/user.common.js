import jwt from 'jwt-simple'
import { getPerfisByName } from '../perfis/perfil.controller'

export const getUserLogged = async (user) => {
  const perfis = await getPerfisByName(user.perfis)
  const now = Math.floor(Date.now() / 1000)

  // payload para o token
  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email,
    perfis: perfis.map(perfil => perfil.name),
    iat: now,
    exp: now + (3 * 24 * 60 * 60)
  }

  const authSecret = process.env.APP_AUTH_SECRET
  const token = jwt.encode(userInfo, authSecret)
  userInfo.perfis = [...perfis]

  return {
    ...userInfo,
    token
  }
}