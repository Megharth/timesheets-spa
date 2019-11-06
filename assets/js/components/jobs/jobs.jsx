import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { get_jobs } from '../../ajax'
import store from '../../store'

const jobList = connect(({ jobs }) => ({ jobs }))(({ jobs }) => {
    if(jobs.size == 0)
        get_jobs()

    let renderJobs = Array.from(jobs, ([key, job]) => {
        return(
            <tr key={key}>
                <td>{job.job_code}</td>
                <td>{job.name}</td>
                <td>${job.budget}</td>
                <td>{job.manager.name}</td>
                <td>{job.description}</td>
            </tr>
        )
    })
    return (
        <div className="container">
            <h1>Existing Jobs</h1>
            <table className="table">
                <thead>
                    <tr>
                        <td>Job Code</td>
                        <td>Name</td>
                        <td>Budget</td>
                        <td>Manager</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {renderJobs}
                </tbody>
            </table>
        </div>
    )
})

export default jobList