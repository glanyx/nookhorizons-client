import React from 'react';
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import { muiTheme } from "storybook-addon-material-ui";
import theme from "../theme";

import { ItemCard } from '../components';

export const itemData = {
    itemId: 1,
    name: 'Item for Sale'
};

export const saleData = {
    saleId: 1,
    item: itemData,
    price: 500
}

export const actionData = {
    onPurchase: action('Purchased')
}

storiesOf("Sale Card", module)
  .addDecorator(muiTheme(theme))
  .add("Card", () => <ItemCard sale={{...saleData}} {...actionData} />);
