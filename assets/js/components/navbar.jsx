import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { Provider, connect } from 'react-redux';
import { Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import store from '../store'
export default function Navigation(props) {
    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand>Timesheets</Navbar.Brand>
            <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Session />
            </Navbar.Collapse>
        </Navbar>
    )
}


let Session = connect(({ session }) => ({ session }))(({ session, dispatch }) => {
    function logout(ev) {
        ev.preventDefault()
        localStorage.removeItem('session')
        dispatch({
            type: 'LOG_OUT'
        })
        window.location.replace("/")
    }

    if(session) {
        return (
            <Nav className="ml-auto">
                <Nav.Item>
                    <NavLink to={"/" + session.user_type + "/dashboard"} exact 
                        className="nav-link" activeClassName="active"> 
                        Dashboard
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/jobs" exact className="nav-link" activeClassName="active">
                        Jobs
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/" activeClassName="active" exact className="nav-link"
                        onClick={logout}>Logout</NavLink>
                </Nav.Item>
            </Nav>
        )
    } else {
        return (
            <Nav className="ml-auto">

            </Nav>
        )
    }
})