import gql from 'graphql-tag';

export const messageAddedSubscription = gql`
subscription{
  messageAdded{
    id
    text
    userFrom
    minHours
  }
}
`
