import MessageInput from './message-input'
import MessageList from './message-list';
import Divider from '@material-ui/core/Divider';
import useChatMessages from '../../../hooks/useChatMessages';

const MessageWrapper = () => {
    const { messages, addMessage } = useChatMessages()

    const handleSend = async (text) => {
        const { data } = await addMessage(text)
    }

    return (
        <>
            <MessageList messages={messages}/>
            <Divider />
            <MessageInput onSend={handleSend}/> 
        </>
    )

}

export default MessageWrapper