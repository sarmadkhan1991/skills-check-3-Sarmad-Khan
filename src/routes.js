import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/dashboard';
import Wizard from './Components/Wizard/wizard';


export default (
    <Switch>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/wizard' component={wizard}/>
    </Switch>
)