import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Component, useState } from 'react';

class MessageInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }
    }

    onHandleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSend = () => {
        this.props.onSend(this.state.message)
        this.setState({
            message: ''
        })
    
    }

    render() {
        return (
            <Grid container style={{ padding: '20px' }} onKeyPress={(e) => e.key === 'Enter' ? this.handleSend() : null}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Type Something"
                        fullWidth value={this.state.message} onChange={this.onHandleChange}
                    />
                </Grid>
                <Grid item xs={1} align="right">
                    <Fab color="primary" aria-label="add" onClick={this.handleSend}><SendIcon /></Fab>
                </Grid>
            </Grid>
        )
    }
}

export default MessageInput