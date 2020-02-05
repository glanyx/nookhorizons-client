import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select,  text } from '@storybook/addon-knobs/react';
import { muiTheme } from 'storybook-addon-material-ui';
import theme from '../theme';

import { Clock } from '../components';

const options = {
    variant: ['default', 'outlined']
}

storiesOf('Clock', module)
    .addDecorator(muiTheme(theme))
    .addDecorator(withKnobs)
    .add('Clock', () => (
        <Clock date={new Date()} />
    ));