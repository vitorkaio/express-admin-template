import User from '../user/user.model'
import { ResponseSuccess, ResponseFail } from '../response/response'
import codes from '../response/code'
import { compare } from '../../services/services'
import { getUserLogged } from '../common/user.common'

export const login = async (req, res) => {
  const data = req.body
  try {
    const user = await User.findOne({email: data.email}).populate('perfis')
    if (user) {
      const passwordValid = await compare(data.password, user.password)
      if (passwordValid) {
        const result = await getUserLogged(user)
        console.log(result)
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
  
}
