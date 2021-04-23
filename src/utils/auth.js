import jwtDecode from 'jwt-decode';
import getCookie from './cookie';

const loginUrl = 'http://localhost:9000/login';
const registerUrl = 'http://localhost:9000/register'
const verifyURL = 'http://localhost:9000/verify'

function getUserFromToken(token) {
  return jwtDecode(token).id;
}

export async function register(username, email, password) {
  const promise = await fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, email, password})
  });
  if (!promise.ok) {
    return null;
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

export async function login(username, password) {
    const promise = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });
    if (!promise.ok) {
      return null;
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