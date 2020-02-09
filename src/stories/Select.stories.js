import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { StyledSelect } from "../components";

const tags = [
'Tag 1',
'Tag 2',
'Tag 3'
];

const selectData = {
    options: tags,
    choices: list,
    onChange: handleChange
}

storiesOf("Styled Select", module)
  .addDecorator(muiTheme(theme))
  .add("Select", (list, setList) => <StyledSelect multiple onChange={e => setList(e.target.value)} choices={list} {...selectData} />)
