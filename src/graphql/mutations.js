import { gql } from '@apollo/client'

export const addMessageMutation = gql`
  mutation addMessage($input: MessageInput!){
  message: addMessage(input: $input){
    id
    text
    userFrom
    minHours
  }
}
`;