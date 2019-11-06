import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Container, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router'
import store from '../../store'

import { add_worker } from '../../ajax'

class NewWorker extends React.Component {
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
            type: 'CHANGE_NEW_WORKER', data
        })
    }

    render() {

        if(!store.getState().session) {
            return <Redirect to="/" />
        }

        if(this.state.redirect)
            return <Redirect to={this.state.redirect} />

        let {name, email, pay, password_hash, errors} = this.props
        let error_msg = null
        if(errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        this.changed({manager_id: store.getState().session.user_id})
        return(
            <Container>
                <h1 align="center">New Worker</h1>
                { error_msg }
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" 
                        onChange={(ev) => {this.changed({name: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" 
                        onChange={(ev) => {this.changed({email: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="password_hash">
                     <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        onChange={(ev) => {this.changed({password_hash: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="pay">
                     <Form.Label>Pay</Form.Label>
                     <Form.Control type="number"  step="0.5" 
                        onChange={(ev) => {this.changed({pay: ev.target.value})}}
                     />
                </Form.Group>
                <Button variant="primary" onClick={() => {add_worker(this)}}>Create</Button>
            </Container>
        )
    }

}

function state2props(state) {
    return state.forms.new_worker;
}

export default connect(state2props)(NewWorker);
