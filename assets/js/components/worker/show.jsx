import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { get } from '../../ajax'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default class ShowUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        this.getUser = this.getUser.bind(this)
        this.getUser(this.props.match.params.id)
    }

    getUser(id) {
       get('/workers/' + id).then(resp => {
            this.setState({user: resp.data})
        })
    }

    renderTimesheets(timesheets) {
        return timesheets.map((timesheet) => {     
            return (
                <tr key={timesheet.id}>
                    <td>{timesheet.date}</td>
                    <td>{timesheet.approved == true ? "Approved" : "Not Approved"}</td>
                    <td><NavLink to={'/show_timesheet/' + timesheet.id}>Show Timesheet</NavLink></td>
                </tr>
            )
        })
    }   

    render() {
        if(this.state.user) {
            return(
                <Container>
                    <h1>Worker</h1>
                    <h6>Name: {this.state.user.name}</h6>
                    <h6>pay: {this.state.user.pay}</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTimesheets(this.state.user.timesheets)}
                        </tbody>
                    </table>
                </Container>
            )
        } else {
            return null
        }
    }
}