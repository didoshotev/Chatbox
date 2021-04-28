import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { headerStyles } from '../../styles/styles'
import UserContext from '../../Context';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';


export default function ButtonAppBar() {
  const classes = headerStyles();
  const context = useContext(UserContext)
  const history = useHistory()

  const logOut = (e) => {
    e.preventDefault()
    context.logOut()
    history.push('/login')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" className={classes.title}>
            Chatbox
          </Typography>

          {
            !context.user ?
              (
                <div>
                  <Button component={Link} to={'/login'} color="inherit">Login</Button>
                  <Button component={Link} to={'/register'} color="inherit">Register</Button>
                </div>

              ) :
              (
                <Button onClick={logOut} color="inherit">Logout</Button>
              )
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}
