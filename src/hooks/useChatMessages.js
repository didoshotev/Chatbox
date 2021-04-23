import { useQuery } from "@apollo/client"
import { LOAD_MESSAGES } from '../graphql/queries'

const useChatMessages = () => {
    const { data } = useQuery(LOAD_MESSAGES)
    const messages = data ? data.messages : []
    
    return {
        messages
    }
}

export default useChatMessages