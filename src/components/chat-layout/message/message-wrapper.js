import MessageInput from './message-input'
import MessageList from './message-list';
import Divider from '@material-ui/core/Divider';
import useChatMessages from '../../../hooks/useChatMessages';
import { useQuery } from '@apollo/client';
import { LOAD_MESSAGES } from '../../../graphql/queries';

const MessageWrapper = () => {
    const handleSend = async (text) => {
    }
    const { messages } = useChatMessages()

    return (
        <>
            <MessageList messages={messages} />
            <Divider />
            <MessageInput onSend={handleSend} />
        </>
    )

}

export default MessageWrapper