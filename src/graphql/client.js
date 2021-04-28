import {
    ApolloClient, ApolloLink, HttpLink, InMemoryCache, split
  } from 'apollo-boost';
  import { WebSocketLink } from 'apollo-link-ws'
  import { getMainDefinition } from 'apollo-utilities'
  import getCookie from '../utils/cookie';
  import { setContext } from '@apollo/client/link/context'

  const httpUrl = 'http://localhost:9000/graphql';
  const wsUrl = 'ws://localhost:9000/graphql';
  
  
  const httpLink = ApolloLink.from([
    new ApolloLink((operation, forward) => {
      const token = getCookie('x-auth-token')
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
      connectionParams: () => {
        return {
          accessToken: getCookie('x-auth-token')
        }
      },
      inactivityTimeout: 1000,
      connectionCallback: (err) => {
        if(err) {
          console.log('Error Connecting to Subsciption Server', err);
        }
      }
    }
  })

  // Custom middleware for accessing chat subscription
  const subscriptionMiddleware = {
    applyMiddleware (options, next) {
      options.auth = {accessToken: getCookie('x-auth-token')}
      next()
    }
  }

  wsLink.subscriptionClient.use([subscriptionMiddleware])

  const isSubsciption = (operation) => {
    const definition = getMainDefinition(operation.query)
    // console.log(definition.operation);
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
  