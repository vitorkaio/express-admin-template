import * as mongoose from 'mongoose'

const perfilSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

export default mongoose.model('Perfil', perfilSchema)