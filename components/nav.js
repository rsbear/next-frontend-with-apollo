import React from "react";
import Link from "next/link";

import cookie from "cookie";
import redirect from "../lib/redirect";

import styled from "@emotion/styled";
import { ApolloConsumer } from "react-apollo";

// link routes
const links = [
  { href: "/posts", label: "posts" },
  { href: "/login", label: "login" },
  { href: "/signup", label: "Signup" }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

// logged in link routes
const loggedInLinks = [
  { href: "/posts", label: "posts" },
  { href: "/account", label: "account" }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

// render the routes in a map
const Nav = props => {
  const signout = apolloClient => () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    apolloClient.cache.reset().then(() => {
      redirect({}, "/login");
    });
  };
  return (
    <ApolloConsumer>
      {client => (
        <NavStyle>
          <div>
            <Link prefetch href="/">
              <Anchor>Dear Darla</Anchor>
            </Link>
          </div>
          {props.loggedInUser.me ? (
            <ul>
              {loggedInLinks.map(({ key, href, label }) => (
                <Item key={key}>
                  <Link prefetch href={href}>
                    <Anchor>{label}</Anchor>
                  </Link>
                </Item>
              ))}
              <Item>
                <AnchorSpan onClick={signout(client)}>log out</AnchorSpan>
              </Item>
            </ul>
          ) : (
            <ul>
              {links.map(({ key, href, label }) => (
                <li key={key}>
                  <Link prefetch href={href}>
                    <Anchor>{label}</Anchor>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </NavStyle>
      )}
    </ApolloConsumer>
  );
};

export default Nav;

const NavStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100px;
  left: 0;
  top: 0;
  padding: 0 40px;
  box-sizing: border-box;
  border-bottom: solid 1px lightgray;
`;

const Item = styled.li`
  margin: 0 10px;
`;

const Anchor = styled.a`
  font-size: 0.8em;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
`;

const AnchorSpan = styled.span`
  font-size: 0.8em;
  font-weight: 400;
  text-transform: uppercase;
  cursor: pointer;
`;
