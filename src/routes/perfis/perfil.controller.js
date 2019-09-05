import Perfil from './perfil.model'
import { ResponseSuccess, ResponseFail } from '../response/response'
import codes from '../response/code'

export const getPerfils = async (_, res) => {
  try {
    const result = await Perfil.find({})
    ResponseSuccess(res, codes.OK, result)
  } catch (err) {
    ResponseFail(res, codes.ERROR, err)
  }
}

export const getPerfilById = async (req, res) => {
  try {
    const result = await Perfil.findById(req.params.id)
    if (result) {
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}

export const createPerfil = async (req, res) => {
  try {
    const result = await Perfil.create(req.body)
    ResponseSuccess(res, codes.CREATE, result)
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}

export const deletePerfil = async (req, res) => {
  try {
    const result = await Perfil.findByIdAndDelete(req.params.id)
    if (result) {
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}

export const UpdateAllPerfil = async (req, res) => {
  try {
    const ops = { overwrite: true, new: true }
    const result = await Perfil.findByIdAndUpdate({ _id: req.params.id }, req.body, { ...ops })
    if (result) {
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const UpdateHalfPerfil = async (req, res) => {
  try {
    const ops = { new: true }
    const result = await Perfil.findByIdAndUpdate({ _id: req.params.id }, req.body, { ...ops })
    if (result) {
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const getPerfisByName = async (listPerfis) => {
	const perfis = []
	for (let perfil of listPerfis) {
		const newPerfil = await Perfil.findOne({name: perfil.name})
		if (newPerfil) {
			perfis.push(newPerfil)
		}
  }
	return [...perfis]
}
