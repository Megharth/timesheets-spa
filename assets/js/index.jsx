import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Redirect, Switch, Route, NavLink, Link} from 'react-router-dom'
import { Provider, connect } from 'react-redux';

//Components and function
import Navigation from './components/navbar'
import Login from './components/login'
import PrivateRoute from './privateRoute'
import ManagerDashboard from './components/manager/dashboard'

import JobsDashboard from './components/jobs/jobs'
import NewJob from './components/jobs/new'

import NewWorker from './components/worker/new'
import WorkerDashboard from './components/worker/dashboard'
import ShowWorker from './components/worker/show'

import NewTimesheet from './components/timesheet/new'
import ShowTimesheet from './components/timesheet/show'
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
                <PrivateRoute path="/manager/dashboard">
                    <ManagerDashboard />
                </PrivateRoute>
                <PrivateRoute path="/worker/dashboard">
                    <WorkerDashboard />
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
                <PrivateRoute path="/new_timesheet">
                    <NewTimesheet />
                </PrivateRoute>
                <PrivateRoute path="/show_timesheet/:id" component={ShowTimesheet}>
                </PrivateRoute>
                <PrivateRoute path="/show_worker/:id" component={ShowWorker}>
                </PrivateRoute>
            </Switch>
        </Router>
    )
}


