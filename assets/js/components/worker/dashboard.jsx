import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { get_timesheets } from '../../ajax'
import { Redirect } from 'react-router'
import store from '../../store'
import { NavLink } from 'react-router-dom'
import taskList from '../timesheet/show'
const timesheets_list = connect(({ timesheets }) => ({ timesheets }))(({ timesheets }) => {
    if(timesheets.size === 0){
        get_timesheets(store.getState().session.user_id)
    }

    let renderTimesheets = Array.from(timesheets, ([key, timesheet]) => {
        return (
            <tr key={key}>
                <td>{timesheet.date}</td>
                <td>{timesheet.approved == true ? "Approved" : "Not Approved"}</td>
                <td><NavLink to={'/show_timesheet/' + timesheet.id}>Show Timesheet</NavLink></td>
            </tr>
        )
    })

    return (
        <div className="container">
            <h1 align="center">Dashboard</h1>
            <h5>Name: {store.getState().session.user_name}</h5>
            <h5>Your Timesheets</h5>
            <NavLink className="btn btn-primary ml-auto d-block add-btn" to="/new_timesheet">+ New Timehseet</NavLink>

            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Show</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTimesheets}
                </tbody>
            </table>
        </div>
    )
    
})

export default timesheets_list