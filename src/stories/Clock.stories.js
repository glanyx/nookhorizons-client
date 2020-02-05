import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { Clock } from "../components";

storiesOf("Clock", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "red",
        display: "inline-block",
        borderRadius: 10
      }}
    >
      {story()}
    </div>
  ))
  .add("Clock", () => <Clock />);
