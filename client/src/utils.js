const validatePassword = password => {
  return password.length >= 6;
}

const getJWT = () => {
  return localStorage.getItem('mailsender_token')
}

export {
  validatePassword,
  getJWT
}