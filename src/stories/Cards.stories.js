import React from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { ItemCard, SaleCard } from '../components';

export const itemData = {
    itemId: 1,
    name: 'Item for Sale',
    category: 'Items',
    tags: [
        'Tag 1',
        'Tag 2'
    ],
    saleCount: 11
};

export const userData = {
    userId: 1,
    username: 'Glanyx'
}

export const saleData = {
    saleId: 1,
    price: 500,
    user: userData
};

export const actionData = {
    onSelect: action('Selected')
}

storiesOf("Cards", module)
  .addDecorator(muiTheme(theme))
  .addDecorator(withKnobs)
  .add("Item Card", () => <ItemCard item={{...itemData}} {...actionData} />)
  .add("Sale Card", () => <SaleCard sale={{...saleData}} {...actionData} />);
