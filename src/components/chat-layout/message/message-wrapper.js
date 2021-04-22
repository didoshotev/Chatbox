import MessageInput from './message-input'
import MessageList from './message-list';
import Divider from '@material-ui/core/Divider';

const MessageWrapper = () => {
    const handleSend = async(text) => {
        console.log(text);
    }

    return (
        <>
            <MessageList />
            <Divider />
            <MessageInput onSend={handleSend}/>
        </>
    )
}

export default MessageWrapper