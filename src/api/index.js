import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloUrl = process.env.REACT_APP_APOLLO_SERVER

export const client = new ApolloClient({
  uri: apolloUrl,
  cache: new InMemoryCache()
})
