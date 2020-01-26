import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { muiTheme } from 'storybook-addon-material-ui';
import theme from '../theme';

import { StyledButton } from '../components';

const options = {
    theme: ['default', 'primary', 'secondary'],
    variant: ['contained', 'outlined']
}

storiesOf('Styled Button', module)
    .addDecorator(muiTheme(theme))
    .addDecorator(withKnobs)
    .add('Button', () => (
        <StyledButton color={select('Theme', options.theme, 'default')} variant={select('Variant', options.variant, 'contained')}>
            Button
        </StyledButton>
    ));