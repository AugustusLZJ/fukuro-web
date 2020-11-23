import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { withAuthenticator} from '@aws-amplify/ui-react';

const query = gql`
  query Query {
    hello
  }
`

const Index = () => {
  const {
    loading,
    error,
    data
  } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log('error: ', error)
    return <p>Error :(</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data.hello}</h1>
        {/*<h1>{userData.user}</h1>*/}
      </header>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: query,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default withAuthenticator(Index)
