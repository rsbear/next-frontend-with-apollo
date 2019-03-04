// import { ApolloClient } from "apollo-client";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink, createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { ApolloLink, split } from "apollo-link";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

const configAPI = "http://localhost:4001/graphql";

function create(initialState, { getToken }) {
  const httpLink = createHttpLink({
    uri: configAPI,
    credentials: "same-origin"
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    // link: ApolloLink.concat([link]),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState, options) {
  // const token = localStorage.getItem(AUTH_TOKEN);

  if (process.browser) {
    return create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
