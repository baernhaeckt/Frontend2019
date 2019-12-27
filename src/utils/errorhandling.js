export const handleError = err => {
  console.log({ err })
  let error = {
    unauthorized: false,
    error: err,
    message: undefined
  }
  if (err.response && err.response.status === 401) {
    error.unauthorized = true
  }
  if (err.response && err.response.data && err.response.data.title) {
    let errors = err.response.data.errors
    error.message = `${err.response.data.title}: ${Object.keys(errors).map(
      key => errors[key].join(', ')
    )}`
  }

  return error
}
