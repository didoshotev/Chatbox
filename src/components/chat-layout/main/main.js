import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { mainStyles } from '../chat-styles'
import ListContacts from '../list/list-contacts'
import MessageInput from '../message/message-input'
import MessageList from '../message/message-list';

const MainChat = () => {
  const classes = mainStyles();

  return (
      <div>
        <Grid container>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection}>
            <Grid item xs={3} className={classes.borderRight500}>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                </Grid>
                <Divider />
                <ListContacts />
            </Grid>
            <Grid item xs={9}>
                <MessageList />
                <Divider />
                <MessageInput />
            </Grid>
        </Grid>
      </div>
  );
}

export default MainChat;