import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Form, Button, Alert } from 'react-bootstrap'
import store from '../../store'
import { get } from '../../ajax'

class NewTask extends React.Component {
    constructor(props) {
        super(props)
        get('/jobs').then(resp => this.setJobs(resp.data))
        this.state = {
            jobs: null
        }
    }
    setJobs(jobs) {
        jobs = jobs.map((job) => {
            return(
                <option key={job.id}>{job.job_code}</option>
            )
        })
        this.setState({jobs})
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_NEW_TASK', data
        })
    }

    addTask() {
        let hours = Array.from(store.getState().tasks, ([key, task]) => task.hours).reduce((acc, task) => {
            return acc + parseInt(task)
        }, 0);

        let new_task = store.getState().forms.new_task
        if(hours + parseInt(new_task.hours) <= 8) {
            this.props.dispatch({
                type: 'ADD_TASK',
                data: new_task
            })
            this.props.parentCallback()   
        } else {
            this.props.dispatch({
                type: 'CHANGE_NEW_TIMESHEET',
                data: {errors: ["No more than 8 hours allowed."]}
            })
        }
    }
    render() {
        this.changed({timesheet_id: this.props.id})
        return(      
            <tr>
                <td>
                    <Form.Group controlId="job_code">
                        <Form.Control as="select" 
                            onChange={(ev) => {this.changed({job_code: ev.target.value})}}
                        >
                            <option>Select</option>
                            {this.state.jobs}
                        </Form.Control>
                    </Form.Group>
                </td>
                <td>
                    <Form.Group controlId="hours">
                        <Form.Control type="number" step="0.5"
                            onChange={(ev) => {this.changed({hours: ev.target.value})}}
                        />
                    </Form.Group>
                </td>
                <td>
                    <Button variant="primary" onClick={() => this.addTask()}>+ Add</Button>
                </td>
            </tr>
        )
    }

}

function state2props(state) {
    return state.forms.new_task;
}

export default connect(state2props)(NewTask);
