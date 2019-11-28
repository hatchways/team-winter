const API_BASE_URL = 'http://localhost:5000';

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
 * made with the apiGET or apiPOST methods
 * @extends Error
 */
class APIError extends Error {
  /**
   * Create an APIError
   * @param {number} statusCode - Status code returned by the API
   */
  constructor(statusCode) {
    super(`Error during API request. Received ${statusCode} status code.`);
  }
}

/**
 * GET data from the MailSender API
 * 
 * @param {string} path - Resource to request
 * @returns {Promise} - Promise which resolves to the returned JSON data
 * @throws {APIError} Thrown if response status code is outside 200-299
 */
const apiGET = async (path) => {
  const url = API_BASE_URL + path
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getJWT()}`
    }
  });
  // accept all 200 status codes
  if(response.status > 199 && response.status < 300) {
    const responseJSON = await response.json();
    return responseJSON;
  }
  else {
    throw new APIError(response.status);
  }
}

/**
 * POST data to the MailSender API
 * 
 * @param {string} path - Resource to POST to
 * @param {object} data - Object to send in the body of the request
 * @returns {Promise} - Promise which resolves to the returned JSON data
 * @throws {APIError} Thrown if response status code is outside 200-299
 */
const apiPOST = async (path, data) => {
  const url = API_BASE_URL + path;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getJWT()}`
    },
    body: data
  });
  // accept all 200 status codes
  if(response.status < 200 || response.status > 299) {
    const responseJSON = await response.json();
    return responseJSON;
  }
  else {
    throw new APIError(response.status);
  }
}

export {
  validatePassword,
  getJWT,
  apiGET,
  apiPOST
}