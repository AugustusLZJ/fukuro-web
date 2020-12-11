import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Auth } from "aws-amplify";

const query = gql`
  query Query {
    hello
  }
`

const Index = () => {
  const {
    client,
    loading,
    error,
    data
  } = useQuery(query);

  if (loading) return <p>Loading...</p>
  if (error) {
    console.log('error: ', error)
    return <p>Error :(</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data.hello}</h1>
        {/*<h1>{userData.user}</h1>*/}
      </header>
    </div>
  )
}

export async function getStaticProps(context) {
  console.log("index.js: getStaticProps")
  const apolloClient = initializeApollo()

  try {
    await apolloClient.query({
      query: query,
    })
    console.log("Cache:")
    console.log(apolloClient.cache.data.data)

  } catch (err) {
    console.error(`error: ${err}`)
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
      },
    }
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default withAuthenticator(Index)
