import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Container, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router'
import store from '../../store'

import { add_job } from '../../ajax'

class NewJob extends React.Component {
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
            type: 'CHANGE_NEW_JOB', data
        })
    }

    render() {

        if(!store.getState().session) {
            return <Redirect to="/" />
        }

        if(this.state.redirect)
            return <Redirect to={this.state.redirect} />

        let {job_code, name, budget, description, errors} = this.props
        let error_msg = null
        if(errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        this.changed({manager_id: store.getState().session.user_id})
        return(
            <Container>
                <h1 align="center">New Job</h1>
                { error_msg }
                <Form.Group controlId="job_code">
                    <Form.Label>Job Code</Form.Label>
                    <Form.Control type="text" 
                        onChange={(ev) => {this.changed({job_code: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" 
                        onChange={(ev) => {this.changed({name: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="budget">
                     <Form.Label>Budget</Form.Label>
                    <Form.Control type="number" step="0.5"
                        onChange={(ev) => {this.changed({budget: ev.target.value})}}
                    />
                </Form.Group>
                <Form.Group controlId="description">
                     <Form.Label>Description</Form.Label>
                     <textarea className="form-control" onChange={(ev) => {this.changed({description: ev.target.value})}} />
                </Form.Group>
                <Button variant="primary" onClick={() => {add_job(this)}}>Create</Button>
            </Container>
        )
    }

}

function state2props(state) {
    return state.forms.new_job;
}

export default connect(state2props)(NewJob);
