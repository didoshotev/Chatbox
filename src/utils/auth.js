import jwtDecode from 'jwt-decode';


const loginUrl = `${process.env.REACT_APP_BASE_URL}/login`
const registerUrl = `${process.env.REACT_APP_BASE_URL}/register`;
const verifyURL = `${process.env.REACT_APP_BASE_URL}/verify`


function getUserFromToken(token) {
  return jwtDecode(token).id;
}

async function base(data, url) {
  const promise = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if(!promise.ok) {
    return null
  }
  const authToken = promise.headers.get('Authorization')
  document.cookie = `x-auth-token=${authToken}`
  const response = await promise.json()
  if(response.username && authToken) {
      return {
          username: response.username,
          id: response._id,
          error: false
      }
  } else {
      return {
        error: true
      }
  }
}

export async function register(username, email, password) {
  return await base({username, email, password}, registerUrl)
}

export async function login(username, password) {
  return await base({username, password}, loginUrl)
}

export async function isVerified(token) {
  const promise = await fetch(verifyURL, {
        method: 'POST',
        body: JSON.stringify({
            token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const result = await promise.json()
    return result
}