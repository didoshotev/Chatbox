import { mainStyles } from '../chat-styles'
import MessageItem from './message-item';
import List from '@material-ui/core/List';
import React, { Component } from 'react';
import UserContext from '../../../Context';

class MessageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stateMessages: this.props.messages || []
        }
      
    }
    static contextType = UserContext;


    render() {
        const dummyData = [
    {
        key: "1",
        text: "Hey man, What's up ?",
        time: "09:30",
        align: "right"
    },
    {
        key: "2",
        text: "Good you ?",
        time: "09:35",
        align: "left"
    },
    {
        key: "3",
        text: "Perfect !",
        time: "10:03",
        align: "right"
    },
]
        // const classes = this.mainStyles();
        const { messages } = this.props
        const user = this.context.user || { username: "" }

        return (
            <List style={{
                height: '73vh',
                overflowY: 'auto'
            }}>
                {messages.map((item, index) => {
                    return <MessageItem
                        key={index}
                        text={item.text}
                        time={item.minHours}
                        // time={item.time.toString()}
                        align={user.username === item.userFrom ? 'right' : 'left'}
                    />
                })}
            </List>
        )
    }

}

export default MessageList
