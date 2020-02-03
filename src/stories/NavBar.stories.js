import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { NavBar } from "../components";

export const userDataUnauthenticated = {
  isAuthenticated: false
};

export const userDataAuthenticated = {
  isAuthenticated: true
};

storiesOf("Navigation Bar", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(StoryRouter())
  .add("Unauthenticated", () => <NavBar userProps={userDataUnauthenticated} />)
  .add("Authenticated", () => <NavBar userProps={userDataAuthenticated} />);
