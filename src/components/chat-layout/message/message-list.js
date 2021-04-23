import { mainStyles } from '../chat-styles'
import MessageItem from './message-item';
import List from '@material-ui/core/List';
import { useContext } from 'react';
import UserContext from '../../../Context';


const MessageList = (props) => {
    const classes = mainStyles();
    const context = useContext(UserContext)
    const user = context.user
    // TODO: taka care of positioning RIGHT or LEFT
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

    return (
        <List className={classes.messageArea}>
                    {dummyData.map((item, index) => {
                        return <MessageItem key={index}  text={item.text} time={item.time} align={item.align}/>
                    })}
                </List>
    )
}

export default MessageList