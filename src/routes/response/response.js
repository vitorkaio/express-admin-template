export const ResponseSuccess = (res, code, data) => {
  return res.status(code).json({
    msg: 'success',
    code,
    data
  })
}

export const ResponseFail = (res, code, err) => {
  const listErrors = []
  if (err instanceof Error) {
    for (const key in err['errors']) {
      listErrors.push(err['errors'][key].message)
    }
  }
  return res.status(code).json({
    msg: 'fail',
    code,
    data: listErrors.length === 0 ? err : listErrors
  })
}
