import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useEffect, useRef } from 'react';
import { mainStyles } from '../chat-styles'


const MessageItem = (props) => {
    const classes = mainStyles()

    return (
        <ListItem key="1">
            <Grid container>
                <Grid item xs={12} className={classes['message-item']}>
                    <ListItemText align={props.align} primary={props.text}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                    <ListItemText align={props.align} secondary={props.time}></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default MessageItem