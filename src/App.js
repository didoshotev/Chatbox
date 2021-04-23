import { useEffect, useState } from "react";
import UserContext from "./Context";
import getCookie from "./utils/cookie";
import { isVerified } from './utils/auth'

function App(props) {

  const [userObject, setUserObject] = useState({ loggedIn: null, user: null })

  const logIn = (user) => {
    setUserObject({
      ...userObject,
      loggedIn: true,
      user
    })
  }

  const logOut = () => {
    document.cookie = 'x-auth-token= ; expires= Thu, 01 Jan 1970 00:00:00 GMT'
    setUserObject({
      ...userObject,
      loggedIn: false,
      user: null,
    })
  }

  const verifyUser = async(token) => {
    const response = await isVerified(token)
    if(response.status === true) {
      logIn({
        username: response.user.username,
        id: response.user._id,
        email: response.user.email
      })
    }
  }

  useEffect(() => {
    const token = getCookie('x-auth-token')
    if(!token) {
      logOut()
      return
    }
    verifyUser(token)

  }, [])

  return (
    <>
      <UserContext.Provider value={{
        logIn: logIn,
        logOut: logOut,
        user: userObject.user
      }}>
        {props.children}
      </UserContext.Provider>
    </>


  );
}

export default App;
