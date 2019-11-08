import React from 'react'
import ReactDom from 'react-dom'
import { Route, Redirect } from 'react-router-dom'
import store from './store'

export default function ManagerRoutes({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
            render={(props) => store.getState().session.user_type == "manager" ?
                <Component {...rest} /> : <Redirect to="/" />}
        />
    )
}