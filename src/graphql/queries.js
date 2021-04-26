import gql from 'graphql-tag'
import client from './client'

export const addUserMutation = gql`
    mutation addUserMutation($input: UserInput!){
    addUser(input: $input){
        username
        _id
        email
        password
  }
}
`;

export const LOAD_USERS = gql`
query{
  	users {
      _id
      username
      email
    }
}
`
export const LOAD_MESSAGES = gql`
query messages{
  messages{
    id
    text
    userFrom
    minHours
  }
}
`

export async function getMessages() {
  const info = await client.query({query: LOAD_MESSAGES})
  return info.data.messages
}