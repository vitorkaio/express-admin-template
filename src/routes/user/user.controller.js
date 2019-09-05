import User from './user.model'
import { ResponseSuccess, ResponseFail } from '../response/response'
import codes from '../response/code'
import { cryptPassword } from '../../services/services'

export const getUsers = async (req, res, next) => {
  req.session.info.user && req.session.info.validAdmin()
  try {
    const result = await User.find({}, {password: 0}).populate("perfis", {name: 1})
    ResponseSuccess(res, codes.OK, result)
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const getUserById = async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
    if (result) {
      result.password = undefined
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const createUser = async (req, res) => {
  try {
    const data = req.body
    data.password = await cryptPassword(data.password)
    const result = await User.create(data)
    result.password = undefined
    ResponseSuccess(res, codes.OK, result)
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const deleteUser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id)
    if (result) {
      result.password = undefined
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const updateAllUser = async (req, res) => {
  try {
    const data = req.body
    data.password = await cryptPassword(data.password)
    const ops = { overwrite: true, new: true }
    const result = await User.findByIdAndUpdate({ _id: req.params.id }, data, { ...ops })
    if (result) {
      result.password = undefined
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}


export const updateHalfUser = async (req, res) => {
  try {
    const data = req.body
    if (data.password) {
      data.password = await cryptPassword(data.password)
    }
    const ops = { new: true }
    const result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { ...ops })
    if (result) {
      result.password = undefined
      ResponseSuccess(res, codes.OK, result)
    }
    else ResponseSuccess(res, codes.NOT_FOUND, {})
  } catch (error) {
    ResponseFail(res, codes.ERROR, error)
  }
}
