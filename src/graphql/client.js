import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
  } from 'apollo-boost';
  import { WebSocketLink } from 'apollo-link-ws'
  import { getMainDefinition } from 'apollo-utilities'
import getCookie from '../utils/cookie';

  const httpUrl = 'http://localhost:9000/graphql';
  const wsUrl = 'ws://localhost:9000/graphql';
  
  
  const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
      const token = getCookie('x-auth-token')
      // const data = operation.getContext();
      if (token) {
        operation.setContext({headers: {'authorization': `Bearer ${token}`}});
      }
      return forward(operation);
    }),
    new HttpLink({uri: httpUrl, credentials: 'same-origin'})
  ],
  );

  const wsLink = new WebSocketLink({
    uri: wsUrl,
    options: {
    //   lazy: true,
      reconnect: true,
      connectionParams: () => ({
        accessToken: getCookie('x-auth-token')
      })
    }
  })
  

  const isSubsciption = (operation) => {
    // console.log('isSubscription: ', operation);
    const definition = getMainDefinition(operation.query)
    return definition.kind === 'OperationDefinition'
    && definition.operation === 'subscription'
  }
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: split(isSubsciption, wsLink, httpLink),
    defaultOptions: {query: {fetchPolicy: 'no-cache'}},
    credentials: 'include'
  });
  
  export default client;
  