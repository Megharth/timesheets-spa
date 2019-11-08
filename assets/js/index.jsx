import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Redirect, Switch, Route, NavLink, Link} from 'react-router-dom'
import { Provider, connect } from 'react-redux';

//Components and function
import Navigation from './components/navbar'
import Login from './components/login'

import ManagerRoutes from './managerRoutes'
import PrivateRoute from './privateRoute'
import WorkerRoutes from './workerRoutes'

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
                <Route exact path="/" component={Login}></Route>
                <ManagerRoutes path="/manager/dashboard" component={ManagerDashboard}></ManagerRoutes>
                <WorkerRoutes path="/worker/dashboard" component={WorkerDashboard}></WorkerRoutes>
                <PrivateRoute path="/jobs/" component={JobsDashboard}></PrivateRoute>
                <ManagerRoutes path="/new_job" component={NewJob}></ManagerRoutes>
                <ManagerRoutes path="/new_worker" component={NewWorker}></ManagerRoutes>
                <WorkerRoutes path="/new_timesheet" component={NewTimesheet}></WorkerRoutes>
                <PrivateRoute path="/show_timesheet/:id" component={ShowTimesheet}></PrivateRoute>
                <ManagerRoutes path="/show_worker/:id" component={ShowWorker}></ManagerRoutes>
            </Switch>
        </Router>
    )
}


