import React from "react";
import { storiesOf } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { NavBar } from "../components";

export const userData = {
  isAuthenticated: true
};

storiesOf("Navigation Bar", module)
  .addDecorator(muiTheme(theme))
  .add("Unauthenticated", () => <NavBar />)
  .add("Authenticated", () => <NavBar {...userData} />);
