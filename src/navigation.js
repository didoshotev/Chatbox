import { ApolloProvider } from "@apollo/client"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./components/pages/home-page"
import LoginPage from "./components/pages/login-page"
import RegisterPage from "./components/pages/register-page"
import client from './graphql/client'

const Navigation = () => {

    return (
        <BrowserRouter>
            <Switch>
                <ApolloProvider client={client}>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                </ApolloProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation