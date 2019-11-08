import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { get, update } from '../../ajax'
import { Container } from 'react-bootstrap'
import store from '../../store'
export default class ShowTimesheet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timesheet: null,
            user: store.getState().session.user_type
        }
        this.getTimesheet = this.getTimesheet.bind(this)
        this.getTimesheet(this.props.computedMatch.params.id)
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

    approve() {
        let timesheet = this.state.timesheet
        timesheet.approved = true
        this.setState({timesheet})
        let updatedTimesheet = {
                id: timesheet.id, 
                timesheet: timesheet
            }
        update('/timesheets/' + timesheet.id, updatedTimesheet)
    }

    render() {
        if(this.state.timesheet) {
            return(
                <Container>
                    <h1>Timesheet</h1>
                    <h6>Date: {this.state.timesheet.date}</h6>
                    <div className="row">
                        <div className="col">
                            <h6>Status: {this.state.timesheet.approved == true ? "Approved" : "Not Approved"}</h6>
                        </div>
                        {this.state.user == "manager" && this.state.timesheet.approved == false ? 
                            <div className="col">
                                <button className="btn btn-success ml-auto d-block add-btn" 
                                    onClick={() => this.approve()}>Approve</button>
                            </div> : 
                            null
                        }
                    </div>
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