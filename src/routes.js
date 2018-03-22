import React from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

import App from './containers/App/App';
import Home from './containers/Home/Home';
import Projects from './containers/Projects/Projects';

export default (
    <Router history={ hashHistory }>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home } />
            <Route path="/projects" component={Projects}/>
        </Route>
    </Router>
)