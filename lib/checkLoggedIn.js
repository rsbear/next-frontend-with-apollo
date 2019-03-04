import { gql } from "apollo-boost";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query me {
          me {
            id
            email
            name
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
