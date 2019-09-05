import User from '../user/user.model'
import { ResponseSuccess, ResponseFail } from '../response/response'
import codes from '../response/code'
import { compare } from '../../services/services'
import { getUserLogged } from '../common/user.common'
// import { cryptPassword } from '../../services/services'

export const login = async (req, res) => {
  const data = req.body
  try {
    const user = await User.findOne({email: data.email}).populate('perfis')
    if (user) {
      const passwordValid = await compare(data.password, user.password)
      if (passwordValid) {
        const result = await getUserLogged(user)
        ResponseSuccess(res, codes.OK, result)
      }
      else ResponseFail(res, codes.NOT_FOUND, 'email/password invalid!')
    }
    else ResponseFail(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const register = async (req, res) => {
  try {
    const data = req.body
    data.password = await cryptPassword(data.password)
    data.perfis = ["5d702145d88b481e7ceb08e5"]
    await User.create(data)
    const user = await User.findOne({email: data.email}).populate('perfis')
    if (user) {
      const result = await getUserLogged(user)
      ResponseSuccess(res, codes.OK, result)
    }
  } catch (error) {
    console.log(error)
    ResponseFail(res, codes.ERROR, error)
  }
}
