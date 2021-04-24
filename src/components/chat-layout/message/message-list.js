import { mainStyles } from '../chat-styles'
import MessageItem from './message-item';
import List from '@material-ui/core/List';
import React, { useContext } from 'react';
import UserContext from '../../../Context';

const MessageList = (props) => {
    const classes = mainStyles()
    const context = useContext(UserContext)

    const { messages } = props
    const user = context.user || { username: "" }

    return (
        <List className={classes.messageArea}>
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

export default MessageList

// for tests

// const dummyData = [
//     {
//         key: "1",
//         text: "Hey man, What's up ?",
//         time: "09:30",
//         align: "right"
//     },
//     {
//         key: "2",
//         text: "Good you ?",
//         time: "09:35",
//         align: "left"
//     },
//     {
//         key: "3",
//         text: "Perfect !",
//         time: "10:03",
//         align: "right"
//     },
// ]