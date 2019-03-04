import styled from "@emotion/styled";

// nav styling is in the nav component but for
// main styles and container, we create the grid with
// these 2 divs
export const MainWrapper = styled.div`
  margin-top: 100px;
  min-height: 100%;
  width: 100%;
  display: flex;
`;

export const ContentContainer = styled.div`
  width: ${props => (props.right ? "33%" : "66%")};
  min-height: 100%;
  padding: 40px;
  box-sizing: border-box;
  border-right: ${props => (props.right ? "0" : "solid 1px lightgray")};
`;

// Section titling
export const Titling = styled.h2`
  text-transform: capitalize;
`;
