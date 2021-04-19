import jwtDecode from 'jwt-decode';

const accessTokenKey = 'accessToken';
const loginUrl = 'http://localhost:9000/login';

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
    console.log(authToken);
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

// function getUserFromToken(token) {
//   return jwtDecode(token).sub;
// }
