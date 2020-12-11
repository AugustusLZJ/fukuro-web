import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import Amplify, {Auth} from "aws-amplify";
import config from "../src/aws-exports";
import Layout from "../components/Layout";

Amplify.configure({
  ...config,
  ssr: true
});

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}
