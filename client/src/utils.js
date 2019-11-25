const validatePassword = password => {
  return password.length >= 6;
}

const getJWT = () => {
  return localStorage.getItem('token')
}

export {
  validatePassword,
  getJWT
}