/**
 * Determine if a password is valid
 * 
 * @param {string} password - Password to validate
 * @returns {boolean} - Whether the password is valid
 */
const validatePassword = password => {
  return password.length >= 6;
}

const getAllImportedFrom = (type) => {
  let results = [];
  return fetch(`/prospects`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getJWT()}`
    }
  })
  .then(res => res.json())
  .then(result => {
    const queryObj = {};
    let idx = 0;

    result.Prospects.map((prospect) => {

      if (!queryObj[prospect[type]]) { 
        queryObj[prospect[type]] = {'name': prospect[type], 'id': idx};
        idx ++;
      } 
    })
    results = results.concat(Object.values(queryObj));
  })
  .then(() => {
    return results;
  })
  .catch(err => {
    console.log(err.message);
  });
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
  constructor(statusCode) {
    super(`Error during API request. Received ${statusCode} status code.`);
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
      'Authorization': `Bearer ${getJWT()}`
    },
    body: data
  });
  if(response.status > 199 && response.status < 300) {
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
  apiRequest,
  getAllImportedFrom,
}