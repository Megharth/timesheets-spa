import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Redirect, Switch, Route, NavLink, Link} from 'react-router-dom'
import { Provider, connect } from 'react-redux';

//Components and function
import Navigation from './components/navbar'
import {getManager} from './ajax'
import Login from './components/login'
import ManagerDashboard from './components/manager/dashboard'
import JobsDashboard from './components/jobs/jobs'
import NewJob from './components/jobs/new'
import NewWorker from './components/worker/new'

import store from './store'

export default function init(root) {
    let tree = (
        <Provider store={store}>
            <Index />
        </Provider>
    )
    ReactDom.render(tree, root)
}

function Index(props) {
    return (
        <Router>
            <Navigation/>
            <Switch>
                <Route exact path="/" component={Login}>
                </Route>
                <Route exact path="/signup">
                    Singup
                </Route>
                <PrivateRoute path="/manager/dashboard">
                    <ManagerDashboard />
                </PrivateRoute>
                <PrivateRoute path="/jobs/">
                    <JobsDashboard />
                </PrivateRoute>
                <PrivateRoute path="/new_job">
                    <NewJob />
                </PrivateRoute>
                <PrivateRoute path="/new_worker">
                    <NewWorker />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}


function PrivateRoute({children, ...rest}) {
    return(
        <Route
            {...rest}
            render={({ location }) => store.getState().session ? (children) : <Redirect to={
                {
                    pathname: '/',
                    state: {from:location}
                }
            } />}
        />
    )
}