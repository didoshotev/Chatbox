import { useMutation, useQuery } from "@apollo/client"
import { addMessageMutation } from "../graphql/mutations"
import { LOAD_MESSAGES } from '../graphql/queries'

const useChatMessages = () => {
    const { data } = useQuery(LOAD_MESSAGES)
    const messages = data ? data.messages : []

    const [addMessage, result] = useMutation(addMessageMutation)

    return {
        messages,
        addMessage: (text) => addMessage({
            variables: {input: {text}}
        })
    }
}

export default useChatMessages