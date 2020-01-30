import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from './containers';

function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
        </Switch>
    );
}

export default Routes;