import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

export default function Navigation(props) {
    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand>Timesheets</Navbar.Brand>
            <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <NavLink to="/" activeClassName="active" exact className="nav-link">Home</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/signup" activeClassName="active" exact className="nav-link">Signup</NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}