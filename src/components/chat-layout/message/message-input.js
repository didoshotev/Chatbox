import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

const MessageInput = (props) => {
    const [message, setMessage] = useState('');

    const onHandleSend = () => {
        props.onSend(message)
        setMessage('')
    }
    
    return (
        <Grid container style={{ padding: '20px' }} onKeyPress={(e) => e.key === 'Enter' ? onHandleSend() : null}>
            <Grid item xs={11}>
                <TextField id="outlined-basic-email" label="Type Something"
                    fullWidth value={message} onChange={(e) => setMessage(e.target.value)}
                />
            </Grid>
            <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add" onClick={onHandleSend}><SendIcon /></Fab>
            </Grid>
        </Grid>
    )
}

export default MessageInput