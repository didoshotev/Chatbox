import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../global/copyright'
import { formStyles } from '../../styles/styles'
import RouterLink from '../global/link';
import { useHistory } from 'react-router';
import { register } from '../../utils/auth';
import { useContext, useState } from 'react';
import UserContext from '../../Context';

export default function SignUp() {
  const classes = formStyles();
  const history = useHistory()
  const [credentials, setCredentials] = useState({ username: '', email: '', password: '', error: false })
  const context = useContext(UserContext)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }
  const registerUser = async() => {
    try {
      const { username, email, password } = credentials
      const user = await register(username, email, password)
      if(user) {
        context.logIn(user)
        history.push('/')
        // TODO setContext, user is logged in
      } else {
        setCredentials({
          ...credentials,
          error: true
        })
      }
    } catch(err) {
      console.log('CLIENT ERROR IN CREATING USER');
      console.log(err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={'Password must be atleast 6 symbols long'}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} linkto={'/login'} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

