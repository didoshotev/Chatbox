import { ApolloProvider } from "@apollo/client"
import { useContext } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import HomePage from "./components/pages/home-page"
import LoginPage from "./components/pages/login-page"
import RegisterPage from "./components/pages/register-page"
import UserContext from "./Context"
import client from './graphql/client'

const Navigation = () => {
    const context = useContext(UserContext)
    
    return (
        <BrowserRouter>
            <Switch>
                <ApolloProvider client={client}>
                    <Route path="/" exact component={() => context.loggedIn ? <HomePage/> : <Redirect to={'/login'} />} />
                    <Route path="/login" component={() => !context.loggedIn ? <LoginPage/> : <Redirect to={'/'} />} />
                    <Route path="/register" component={() => !context.loggedIn ? <RegisterPage/> : <Redirect to={'/'} /> } />
                </ApolloProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation