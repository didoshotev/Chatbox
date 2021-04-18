import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BufferList from './bufferList';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        marginTop: '63px',
        backgroundColor: '#121858',
        color: '#ffff'
    },
    appBarTitle: {
        flexGrow: 1,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: '63px',
    },
    toolbar: {
        // backgroundColor: '#35baf6'
    }
}));

const Chat = () => {
    const classes = useStyles();
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
                variant="permanent"
            >
                <Toolbar style={{'backgroundColor': '#0000'}}>
                    User's messages
                </Toolbar>
                {/* <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.appBarTitle} variant="h6" noWrap>
                            WeeChat
            </Typography>
                        <IconButton color="inherit" edge="end">
                            <MoreIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar> */}
                <BufferList />
            </Drawer>
        </React.Fragment>
    );
};

export default Chat;
