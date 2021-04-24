import { gql, useMutation } from '@apollo/client'
import client from './client';

export const CREATE_USER_MUTATION = gql`
    mutation addUser($username: String!, $email: String!, $password: String){
    addUser(username: $username, email: $email, password: $password){
      username
      email
      token
  }
}
`;

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



// export async function addMessage(text) {
//   const result = await client.mutate({
//     mutation: addMessageMutation,
//     variables: {input: {text}}
//   }) 
//   console.log('result in mutation', result);
//   return result.data.message
// }


// export const ADD_MESSAGE = gql`
// mutation addMessage($input: MessageInput!){
// addMessage(input: $input){
//   text
//   userFrom
//   minHours
//   }
// }

// `