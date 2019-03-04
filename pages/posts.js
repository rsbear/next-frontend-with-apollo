import React from "react";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

import { MainWrapper, ContentContainer, Titling } from "./../styles/emotions";
import Browsing from "../components/browsing";

const Posts = props => {
  return (
    <MainWrapper>
      <ContentContainer>
        <Titling>all posts</Titling>
      </ContentContainer>
      <div>
        <Browsing />
      </div>
    </MainWrapper>
  );
};

Posts.getInitialProps = async (context, apolloClient) => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser.me) {
    return { loggedInUser };
  }
  return { loggedInUser };
};

export default Posts;
