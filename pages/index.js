import React from "react";
import Link from "next/link";
import Head from "../components/head";
import { Layout } from "../lib/Layout";

import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

import cookie from "cookie";
import { ApolloConsumer } from "react-apollo";

import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

class Home extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      // console.log(loggedInUser);
      redirect(context, "/login");
    }
    return { loggedInUser };
  }

  signout = apolloClient => () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    apolloClient.cache.reset().then(() => {
      redirect({}, "/login");
    });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            Hello {this.props.loggedInUser.me.name}!<br />
            <button onClick={this.signout(client)}>Sign out</button>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default Home;

const LETTERSQUERY = gql`
  query letters {
    letters {
      id
      dear
      content
    }
  }
`;
