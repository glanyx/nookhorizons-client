import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select,  text } from '@storybook/addon-knobs/react';
import { muiTheme } from 'storybook-addon-material-ui';
import theme from '../theme';

import { StyledChip } from '../components';

const options = {
    variant: ['default', 'outlined']
}

storiesOf('Styled Chip', module)
    .addDecorator(muiTheme(theme))
    .addDecorator(withKnobs)
    .add('Chip', () => (
        <StyledChip
            color={text('Icon Color', 'red')}
            variant={select('Variant', options.variant, 'default')}
            label={text('Text', 'Chip')}
        />
    ));