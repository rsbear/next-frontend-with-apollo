import React from "react";
import { Layout, LayoutNoNav } from "../lib/Layout";

import { useMutation } from "react-apollo-hooks";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const SignUp = props => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userPw, setUserPw] = React.useState("");
  // const [userConfirmPw, setUserConfirmPw] = React.useState("")

  const handleSignup = useMutation(SIGNMEUP, {
    variables: {
      email: userEmail,
      name: userName,
      password: userPw
    }
  });
  return (
    <LayoutNoNav>
      <Mutation mutation={SIGNMEUP}>
        {mutate => (
          <form
            onSubmit={async e => {
              e.preventDefault();

              await mutate({
                variables: {
                  email: userEmail,
                  name: userName,
                  password: userPw
                }
              });
            }}
          >
            <h2>signup: not coded yet</h2>
            <input
              type="text"
              placeholder="email"
              onChange={e => setUserEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="name"
              onChange={e => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={e => setUserPw(e.target.value)}
            />
            {/* <input type="text" placeholder="reenter password" onChange={e => setUserConfirmPw(e.target.value)}  /> */}
            <button type="submit">submit</button>
          </form>
        )}
      </Mutation>
    </LayoutNoNav>
  );
};

export default SignUp;

const SIGNMEUP = gql`
  mutation signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;
