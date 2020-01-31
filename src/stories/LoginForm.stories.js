import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { LoginForm } from "../components";

storiesOf("Login Form", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Form", () => (
    <LoginForm />
  ));
