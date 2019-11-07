import React from 'react'
import ReactDom from 'react-dom'
import { Route } from 'react-router-dom'
import store from './store'

export default function PrivateRoute({children, ...rest}) {
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