import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_data: {
    type: Date,
    default: new Date(Date.now()).toISOString()
  },
  perfis: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perfil', // Referência a coleção Perfil
  }]
})

export default mongoose.model('User', userSchema)