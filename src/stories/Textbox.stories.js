import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { withKnobs, select, text } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import { StyledTextbox } from "../components";

const options = {
  theme: ["default", "primary", "secondary"]
};

storiesOf("Styled Textbox", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Textbox", () => (
    <>
      <StyledTextbox
        type='email'
        color={select("Theme", options.theme, "primary")}
        placeholder='Email address'
        onChange={action('onChange')}
      >
        <MailIcon />
      </StyledTextbox>
      <br />
      <br />
      <StyledTextbox
        type='password'
        color={select("Theme", options.theme, "primary")}
        placeholder='Password'
        onChange={action('onChange')}
      >
        <LockIcon />
      </StyledTextbox>
    </>
  ))
  .add("Error", () => (
    <StyledTextbox
      error
      helperText="Invalid Entry"
      placeholder={text("Label", "Email address")}
      onChange={action('onChange')}
    >
      <MailIcon />
    </StyledTextbox>
  ));
