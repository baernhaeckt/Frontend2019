export const handleError = err => {
  var error = {}
  if (err.response && err.response.data && err.response.data.title) {
    var errors = err.response.data.errors
    error.message = `${err.response.data.title}: ${Object.keys(errors).map(
      key => errors[key].join(', ')
    )}`
  } else {
    error = err
  }

  return error
}
