import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { withKnobs } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { RegisterForm } from "../components";

storiesOf("Register Form", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Form", () => (
    <RegisterForm onSubmit={ e => { e.preventDefault(); action('Submitted')(e); }} />
  ));
