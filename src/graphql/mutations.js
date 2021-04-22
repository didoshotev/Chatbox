import { gql } from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
    mutation addUser($username: String!, $email: String!, $password: String){
    addUser(username: $username, email: $email, password: $password){
      username
      email
      token
  }
}
`;