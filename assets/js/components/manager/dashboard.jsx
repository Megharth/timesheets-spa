import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { get_workers } from '../../ajax'
import { Redirect } from 'react-router'
import store from '../../store'
import { NavLink } from 'react-router-dom'
import { delete_worker } from '../../ajax'

const workerList = connect(({ workers }) => ({ workers }))(({ workers }) => {
    if(workers.size === 0){
        get_workers(store.getState().session.user_id)       
    }

    let renderWorkers = Array.from(workers, ([key, worker]) => {
        return (
            <tr key={key}>
                <td>{worker.name}</td>
                <td>{worker.email}</td>
                <td>${worker.pay}/hr</td>
                <td>Show Timesheets</td>
                <td><button className="btn btn-danger" onClick={() => delete_worker(worker.id)}>Delete</button></td>
            </tr>
        )
    })

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <h5>Name: {store.getState().session.user_name}</h5>
            <h5>Workers under you</h5>
            <NavLink className="btn btn-primary ml-auto d-block add-btn" to="/new_worker">+ New User</NavLink>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Pay</th>
                        <th>Show Timesheets</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {renderWorkers}
                </tbody>
            </table>
        </div>
    )
    
})

export default workerList