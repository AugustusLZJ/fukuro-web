import { useMemo } from 'react'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'
import { Auth } from 'aws-amplify'
import config from "../src/aws-exports"

const { endpoint } = config.aws_cloud_logic_custom[0];
let apolloClient

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema')
    const { schema } = require('./schema')
    return new SchemaLink({ schema })
  } else {
    const { HttpLink } = require('@apollo/client/link/http')
    return new HttpLink({
      uri: endpoint + '/graphql',
      credentials: 'same-origin',
    })
  }
}

const httpLink = createHttpLink({
  uri: endpoint + '/graphql',
  credentials: 'same-origin',
})

const authLink = setContext((request) => new Promise( (resolve, reject) => {
  Auth.currentSession()
    .then(session => {
      console.log("Got auth session")
      const token = session.getIdToken().getJwtToken()
      console.log(token)
      resolve({
        headers: { Authorization: token }
      })
    }, err => {
      console.log("Failed to get auth session: " + err)
      resolve({})
    })
}))

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(createIsomorphLink()),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
