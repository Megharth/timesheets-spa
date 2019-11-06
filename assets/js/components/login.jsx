import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Container, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router'
import store from '../store'

import { submit_login } from '../ajax'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null
        }
    }

    redirect(path) {
        this.setState({ redirect: path })
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_LOGIN', data
        })
    }

    render() {

        if(store.getState().session) {
            return <Redirect to={"/" + store.getState().session.user_type + '/dashboard'} />
        }

        if(this.state.redirect)
            return <Redirect to={this.state.redirect} />

        let {email, password, type, errors} = this.props
        let error_msg = null
        if(errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        return(
            <Container>
                <h1 align="center">Login</h1>
                { error_msg }
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" 
                        onChange={(ev) => {this.changed({email: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                        onChange={(ev) => {this.changed({password: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="type">
                    <Form.Label>User Type</Form.Label>
                    <Form.Check type="radio" label="Worker" name="user_type" 
                        value="worker" onChange={ev => this.changed({type: ev.target.value})} checked={true} />
                    <Form.Check type="radio" label="Manager" name="user_type" 
                        value="manager" onChange={ev => this.changed({type: ev.target.value})} />
                </Form.Group>
                <Button variant="primary" onClick={() => {submit_login(this)}}>Login</Button>
            </Container>
        )
    }

}

function state2props(state) {
    return state.forms.login;
}

export default connect(state2props)(Login);
