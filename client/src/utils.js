/**
 * Determine if a password is valid
 * 
 * @param {string} password - Password to validate
 * @returns {boolean} - Whether the password is valid
 */
const validatePassword = password => {
  return password.length >= 6;
}

/**
 * Get the mailsender JWT from localstorage
 * @returns {string} - The JWT
 */
const getJWT = () => {
  return localStorage.getItem('mailsender_token')
}

/**
 * Class for the Error thrown during requests to the MailSender API 
 * made with the apiRequest method
 * @extends Error
 */
class APIError extends Error {
  /**
   * Create an APIError
   * @param {number} statusCode - Status code returned by the API
   */
  constructor(statusCode, message) {
    super(`Error during API request. Received ${statusCode} status code. Message: ${message}`);
  }
}

/**
 * Make a request to the MailSender API
 * 
 * @param {string} path - Resource path
 * @param {object} data - Data to send in the request body
 * @returns {Promise} - Promise which resolves to the retunred JSON
 * @throws {APIError} - Thrown if the response status code is not 2xx
 */
const apiRequest = async (method, path, data=null) => {
  const response = await fetch(path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`
    },
    body: data === null ? null : JSON.stringify(data)
  });
  if(response.status > 199 && response.status < 300) {
    const responseJSON = await response.json();
    return responseJSON;
  }
  else {
    const responseJSON = await response.json();
    throw new APIError(response.status, JSON.stringify(responseJSON.message));
  }
}

export {
  validatePassword,
  getJWT,
  apiRequest
}