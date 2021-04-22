import { useEffect, useState } from "react";
import UserContext from "./Context";
import getCookie from "./utils/cookie";


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
    this.setState({
      ...userObject,
      loggedIn: false,
      user: null,
    })
  }

  //TODO: verifyUser on refresh

  useEffect(() => {
    const token = getCookie('x-auth-token')
    if (!token) {
      logOut()
      return
    }
  }, [])

  // if(userObject.loggedIn === null) {
  //   return (
  //     <h3>Loading...</h3>
  //   )
  // }

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
