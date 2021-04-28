import { Component } from "react";
import UserContext from "./Context";
import getCookie from "./utils/cookie";
import { isVerified } from './utils/auth'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: null,
      user: null
    }
  }

  logIn = (user) => {
    this.setState({
      loggedIn: true,
      user
    })
  }

  logOut = () => {
    document.cookie = 'x-auth-token= ; expires= Thu, 01 Jan 1970 00:00:00 GMT'
    this.setState({
      loggedIn: false,
      user: null,
    })
  }

  verifyUser = async (token) => {
    const response = await isVerified(token)
    if (response.status === true) {
      this.logIn({
        username: response.user.username,
        id: response.user._id,
        email: response.user.email
      })
    } else {
      this.logOut()
    }
  }

  componentDidMount() {
    const token = getCookie('x-auth-token')
    if (!token) {
      this.logOut()
      return
    }
    this.verifyUser(token)
  }

  render() {
    const { loggedIn, user } = this.state

    if (loggedIn === null) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <UserContext.Provider value={{
        user,
        loggedIn,
        logIn: this.logIn,
        logOut: this.logOut,
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }

}

export default App;
