import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
  } from 'apollo-boost';
  import { WebSocketLink } from 'apollo-link-ws'
  import { getMainDefinition } from 'apollo-utilities'
//   import { getAccessToken } from '../auth';
// import { } from '../utils/auth'  
import getCookie from '../utils/cookie';
import { setContext } from '@apollo/client/link/context'

  const httpUrl = 'http://localhost:9000/graphql';
  const wsUrl = 'ws://localhost:9000/graphql';
  
  
  const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
      const token = getCookie('Authorization')
      const data = operation.getContext();
      if (token) {
        operation.setContext({headers: {'authorization': `${token}`}});
      }
      return forward(operation);
    }),
    new HttpLink({uri: httpUrl, credentials: 'same-origin'})
  ],
  // new ApolloLink((operation, forward) => {
  //   console.log('SECOND PHASE');
  // })
  );

  const wsLink = new WebSocketLink({
    uri: wsUrl,
    options: {
    //   lazy: true,
      reconnect: true,
    //   connectionParams: () => ({
    //     accessToken: getAccessToken()
    //   })
    }
  })
  
  const authLink = setContext((_, data, ) => {
    const token = getCookie('x-auth-token')
    return
    // return {
    //   headers: {
    //     ...headers,
    //     authorization: token ? `Bearer ${token}` : "",
    //   }
    // }
  })

  const isSubsciption = (operation) => {
    // console.log('isSubscription: ', operation);
    const definition = getMainDefinition(operation.query)
    return definition.kind === 'OperationDefinition'
    && definition.operation === 'subscription'
  }
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: split(isSubsciption, wsLink, authLink.concat(httpLink)),
    // defaultOptions: {query: {fetchPolicy: 'no-cache'}},
    credentials: 'include'
  });
  
  export default client;
  