import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/withApollo";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { Layout } from "../lib/Layout";
import Nav from "./../components/nav";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, router } = this.props;
    // const { hasAuth } = this.state;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            {router.route === "/login" || router.route === "/signup" ? (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            ) : (
              <Layout>
                <Nav {...pageProps} />
                <Component {...pageProps} />
              </Layout>
            )}
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
