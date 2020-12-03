import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import Amplify, {Auth} from "aws-amplify";
import config from "../src/aws-exports";

Amplify.configure({
  ...config,
  ssr: true
});

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
