import React, { Fragment } from "react";
import Head from "../components/head";
import Nav from "../components/nav";

import { Global } from "@emotion/core";
import styled from "@emotion/styled";
// import { beige } from "../styles/emotions";

export const Layout = props => {
  return (
    <Fragment>
      <Global styles={globalStyle} />
      <Head title="Home" />
      <div>{props.children}</div>
    </Fragment>
  );
};

// styles consts and components

const globalStyle = {
  body: {
    margin: "0px",
    padding: "0px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
  },
  "ul, li, a, span, p, h1, h2, h3, h4, h5, h6": {
    margin: "0px",
    padding: "0px",
    listStyleType: "none",
    textDecoration: "none",
    display: "flex"
  }
};
