import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./components/pages/home-page"
import LoginPage from "./components/pages/login-page"
import RegisterPage from "./components/pages/register-page"

const Navigation = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Navigation