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

// mutation addUser($input: UserInput!){
//     addUser(input: $input){
//       username
//     _id
//     email
//     password
//     }
//   }


// export const addUser = async (user) => {
//     console.log(user);
//     const response = await client.mutate({
//         mutation: addUserMutation,
//         variables: { input: { user } }
//     })
//     console.log('RES after mutation:', response);
//     console.log('RES after mutation:', response.data);
//     return response.data.user
// }

