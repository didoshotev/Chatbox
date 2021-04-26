import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { mainStyles } from '../chat-styles'


const MessageItem = (props) => {
    const classes = mainStyles()

    return (
        <div>
            <ListItem key="1">
                <Grid container>
                    <ListItemText align={props.align} secondary={props.userFrom}></ListItemText>
                    <Grid item xs={12} className={classes['message-item']}>
                        <ListItemText align={props.align} primary={props.text}></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                        <ListItemText align={props.align} secondary={props.time}></ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        </div>

    )
}

export default MessageItem