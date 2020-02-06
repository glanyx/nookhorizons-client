import React from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs,   text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { ItemCard } from '../components';

export const itemData = {
    item: {
        id: 1,
        name: 'Item for Sale',
        category: 'Items',
        tags: [
            'Tag 1',
            'Tag 2'
        ]
    },
    saleCount: 11
};

export const actionData = {
    onSelect: action('Selected')
}

storiesOf("Cards", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Item Card", () => <ItemCard {...itemData} {...actionData} />);
