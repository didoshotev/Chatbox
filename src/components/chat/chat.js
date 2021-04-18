import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BufferList from './bufferList';
import { TextField } from '@material-ui/core';
import { chatSyles } from '../../styles/chat'

const Chat = () => {
    const classes = chatSyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar className={classes.appBar} color="default">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Dido Shotev
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                classes={{
                    paper: classes.drawerPaper
                }}
                variant="permanent">
                <TextField label="Search" variant="outlined" style={{ 'margin': '7px' }} />
                <BufferList />
            </Drawer>
        </React.Fragment>
    );
};

export default Chat;
