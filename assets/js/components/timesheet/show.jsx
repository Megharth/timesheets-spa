import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { get } from '../../ajax'
import { Container } from 'react-bootstrap'

export default class ShowTimesheet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timesheet: null
        }
        this.getTimesheet = this.getTimesheet.bind(this)
        this.getTimesheet(this.props.match.params.id)
    }

    getTimesheet(id) {
       get('/timesheets/' + id).then(resp => {
            this.setState({timesheet: resp})
        })
    }

    renderTasks(tasks) {
        return tasks.map((task) => {
            
            return (
                <tr key={task.job_code}>
                    <td>{task.job_code}</td>
                    <td>{task.hours}</td>
                </tr>
            )
        })
    }   

    render() {
        if(this.state.timesheet) {
            return(
                <Container>
                    <h1>Timesheet</h1>
                    <h6>Date: {this.state.timesheet.date}</h6>
                    <h6>Status: {this.state.timesheet.approved == true ? "Approved" : "Not Approved"}</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Job Code</td>
                                <td>Hours</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTasks(this.state.timesheet.tasks)}
                        </tbody>
                    </table>
                </Container>
            )
        } else {
            return null
        }
    }
}