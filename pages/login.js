import React from "react";
import cookie from "cookie";
import redirect from "../lib/redirect";
import { Mutation, withApollo } from "react-apollo";
import { gql } from "apollo-boost";

const Login = ({ client }) => {
  let email, password;

  return (
    <Mutation
      mutation={LOGMEIN}
      onCompleted={data => {
        // Store the token in cookie
        document.cookie = cookie.serialize("token", data.login.token, {
          maxAge: 30 * 24 * 60 * 60 // 30 days
        });
        client.cache.reset().then(() => {
          redirect({}, "/");
        });
      }}
    >
      {(login, { data, error }) => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            e.stopPropagation();

            await login({
              variables: {
                email: email.value,
                password: password.value
              }
            });

            email.value = password.value = "";
          }}
        >
          {error && <p>No user found with that information.</p>}
          <input
            name="email"
            placeholder="Email"
            ref={node => {
              email = node;
            }}
          />
          <br />
          <input
            name="password"
            placeholder="Password"
            ref={node => {
              password = node;
            }}
            type="password"
          />
          <br />
          <button>Sign in</button>
        </form>
      )}
    </Mutation>
  );
};

export default withApollo(Login);

const LOGMEIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;
