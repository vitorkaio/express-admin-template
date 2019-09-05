import jwt from 'jwt-simple'

let token = null

export default (req, res, next) => {

  const auth = req.headers.authorization
  token = auth && auth.substring(7) // token vindo do usuário

  let user = null
  let admin = false

  if (token) {
    try {
      let contentToken = jwt.decode(token, process.env.APP_AUTH_SECRET)

      // Verifica se o token expirou
      if(new Date(contentToken.exp * 1000) > new Date()) {
        user = contentToken
      }  
      if (user && user.perfis) {
        admin = user.perfis.includes('administrador')
      }
    
      req.session.info = {
        user,
        admin,
        validAdmin() {
          if (!admin) next(new Error('Access Denied!'))
        },
      }
      next()
    } 
    catch (error) {
      next(new Error('Access Denied!'))
    }
  }
  else {
    next(new Error('Access Denied!'))
  }

}
