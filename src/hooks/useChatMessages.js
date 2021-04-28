import { useMutation, useQuery, useSubscription } from "@apollo/client"
import { addMessageMutation } from "../graphql/mutations"
import { LOAD_MESSAGES } from '../graphql/queries'
import { messageAddedSubscription } from "../graphql/subscriptions"

const useChatMessages = () => {
    const { data } = useQuery(LOAD_MESSAGES)
    const messages = data ? data.messages : []

    useSubscription(messageAddedSubscription, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            if(messages.length > 0) {
                client.writeData({
                    data: {
                        messages: [...messages, subscriptionData.data.messageAdded]
                    }
                })
            }
        }
    })
    const [addMessage, result] = useMutation(addMessageMutation)

    return {
        messages,
        addMessage: (text) => addMessage({
            variables: { input: { text } }
        })
    }
}

export default useChatMessages