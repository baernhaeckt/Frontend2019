export const handleError = err => {
  const error = {
    unauthorized: false,
    error: err,
    message: undefined,
    errorFields: {},
    statusCode: undefined
  }
  if (err.response && err.response.status === 401) {
    error.unauthorized = true
  }
  if (err.response && err.response.status === 403) {
    error.unauthorized = true
    error.message = 'Zugriff verweigert, Benutzername oder Passwort falsch.'
  }
  if (err.response && err.response.data && err.response.data.title) {
    const errors = err.response.data.errors
    error.message = err.response.data.title
    if (errors) {
      error.message += Object.keys(errors).map(key => errors[key].join(', '))
      error.errorFields = errors
    }
  } else if (err.response && err.response.data && err.response.data.error) {
    error.message = err.response.data.error
  }
  if (err.response && err.response.status) {
    error.statusCode = err.response.status
  }

  return error
}

export const handlePasswordRequired = resp => {
  const error = {
    unauthorized: false,
    error: {},
    response: resp,
    message: undefined,
    statusCode: undefined
  }
  if (!(resp.token) || resp.token.length === 0) {
    error.unauthorized = true
    error.message = 'Benutzer bereits registriert, Passwort benötigt.'
    error.statusCode = resp.statusCode
  }

  return error
}
