import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RouterLink from './link';
import { headerStyles } from '../../styles/styles'
import UserContext from '../../Context';


export default function ButtonAppBar() {
  const classes = headerStyles();
  const context = useContext(UserContext)
  console.log(context);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {
            !context.user ?
              (<div>
                <Button component={RouterLink} linkto={'/login'} color="inherit">Login</Button>
                <Button component={RouterLink} linkto={'/register'} color="inherit">Register</Button>
              </div>)
              :
              (<div>
                <Typography variant="h6" className={classes.title}>
                  Welcome, {context.user.username}
                 </Typography>
              </div>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
