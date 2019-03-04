import React from "react";

import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { Layout } from "../lib/Layout";

const WriteLetter = props => {
  const [who, setWho] = React.useState("");
  const [letter, setLetter] = React.useState("");

  const handleCreate = useMutation(CREATE_POST, {
    variables: {
      dear: who,
      content: letter
    }
  });

  return (
    <Layout>
      <h2>CreatePost</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="dear who"
          onChange={e => setWho(e.target.value)}
        />
        <input
          type="text"
          placeholder="content"
          onChange={e => setLetter(e.target.value)}
        />
        <button type="submit">create a post</button>
      </form>
    </Layout>
  );
};

export default WriteLetter;

const CREATE_POST = gql`
  mutation createLetter($dear: String, $content: String) {
    createLetter(dear: $dear, content: $content) {
      dear
      content
    }
  }
`;
