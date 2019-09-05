import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export const cryptPassword = async (pass) => {
  const hash = await bcrypt.hash(pass, SALT_ROUNDS)
  return hash
}

export const compare = async (pass1, pass2) => {
  return await bcrypt.compare(pass1, pass2)
}