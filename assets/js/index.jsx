import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom'
import Navigation from './components/navbar'
import {getManager} from './ajax'

export default function init(root) {
    ReactDom.render(<Index />, root)
}

function Index(props) {
    return (
        <Router>
            <Navigation />
            <button onClick={() => getManager(1)}>Click me</button>
            <Switch>
                <Route exact path="/">
                    <h1>Home</h1>
                </Route>
                <Route exact path="/signup">
                    <h1>Signup</h1>
                </Route>
            </Switch>
        </Router>
    )
}