import React from 'react'
import ReactDom from 'react-dom'
import { Route, Redirect } from 'react-router-dom'
import store from './store'

export default function WorkerRoutes({component: Component, ...rest}) {
    return(
        <Route
            {...rest}
            render={(props) => store.getState().session.user_type == "worker" ? 
                <Component {...rest} /> : <Redirect to="/" />}
        />
    )
}