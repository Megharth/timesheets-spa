import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Container, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router'
import store from '../../store'
import NewTask from './new_task'
import { add_timesheet, add_tasks } from '../../ajax'

class NewTimesheet extends React.Component {
    constructor(props) {
        super(props)
        this.addNewTask = this.addNewTask.bind(this)
        this.state = {
            redirect: null,
        }
    }
    

    redirect(path) {
        this.setState({ redirect: path })
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_NEW_TIMESHEET',
            data: data
        })
    }

    getTasks() {
        return Array.from(store.getState().tasks, ([key, task]) => {
            return (
                <tr key={key}>
                    <td>{task.job_code}</td>
                    <td>{task.hours}</td>
                    <td></td>
                </tr>
            )
        })
    }

    addNewTask() {
        let tasks = this.getTasks()
        this.setState({ tasks: tasks })
    }


    render() {
        let {date, approved, errors, id} = this.props
        let error_msg = null
        if(errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }

        if(this.state.redirect)
            return <Redirect to={this.state.redirect} />

        if(id) {
            return (
                <Container>
                    <h1 align="center">New Timesheet</h1>
                    {error_msg}
                    <div className="row">
                        <div className="column">
                            <input type="date" className="form-control" 
                                value={date}
                                onChange={(ev) => this.changed({ date: ev.target.value })} disabled={true} />                
                        </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Job Code</td>
                                <td>Hours</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks}
                            <NewTask parentCallback={this.addNewTask} id={id}/>
                        </tbody>
                    </table>

                    <Button variant="primary" onClick={() => {add_tasks(this)}}>Save</Button>
                </Container>
            )
        }
        else {
            this.changed({ worker_id: store.getState().session.user_id })
            return(
                <Container>
                    <h1 align="center">New Timesheet</h1>
                    {error_msg}
                    <div className="row">
                        <div className="column">
                            <input type="date" className="form-control" 
                                value={date}
                                onChange={(ev) => this.changed({ date: ev.target.value })} />                    
                        </div>
                        <div className="column">
                            <button className="btn btn-success" onClick={() => {add_timesheet()}}>Create Timesheet</button>
                        </div>
                    </div>
                </Container>
            )
        }
    }
}

function state2props(state) {
    return state.forms.new_timesheet;
}

export default connect(state2props)(NewTimesheet);