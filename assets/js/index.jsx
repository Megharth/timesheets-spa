import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Redirect, Switch, Route, NavLink, Link} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { AlertList, Alert, AlertContainer } from "react-bs-notifier"

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

export default function init(root, channel) {
    let tree = (
        <Provider store={store}>
            <Index channel={channel}/>
        </Provider>
    )
    ReactDom.render(tree, root)
}

class Index extends React.Component {
    constructor(props) {
        super(props)
        this.channel = props.channel
        this.channel.join().receive("ok", resp => console.log(resp))
        this.channel.on("notification", resp => this.addAlert(resp.name, resp.hours))
        this.state = {
            alerts: []
        }
    }

    addAlert(name, hours) {
        if(store.getState().session.user_type == "manager") {
            const alerts = this.state.alerts
            alerts.push({
                id: alerts.length,
                type: "info",
                message: name + " submitted a timesheet with " + hours + " hours of tasks."
            })
            this.setState({alerts})
        }
    }

    onAlertDismiss(alert) {
        console.log(alert)
        const alerts = this.state.alerts
        let index = alerts.indexOf(alert)
        alerts.splice(index, 1)
        this.setState({alerts})
    }
    render() {
        return (
            <div>
                <Router>
                    <AlertList alerts={this.state.alerts} onDismiss={this.onAlertDismiss.bind(this)}/>
                    <Navigation/>
                    <Switch>
                        <Route exact path="/" component={Login}></Route>
                        <ManagerRoutes path="/manager/dashboard" component={ManagerDashboard}></ManagerRoutes>
                        <WorkerRoutes path="/worker/dashboard" component={WorkerDashboard}></WorkerRoutes>
                        <PrivateRoute path="/jobs/" component={JobsDashboard}></PrivateRoute>
                        <ManagerRoutes path="/new_job" component={NewJob}></ManagerRoutes>
                        <ManagerRoutes path="/new_worker" component={NewWorker}></ManagerRoutes>
                        <WorkerRoutes path="/new_timesheet" component={NewTimesheet} channel={this.channel}></WorkerRoutes>
                        <PrivateRoute path="/show_timesheet/:id" component={ShowTimesheet}></PrivateRoute>
                        <ManagerRoutes path="/show_worker/:id" component={ShowWorker}></ManagerRoutes>
                    </Switch>
                </Router>
            </div>
        )
    }
}


