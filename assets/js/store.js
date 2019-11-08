import { createStore, combineReducers } from 'redux'
import deepFreeze from 'deep-freeze-strict'

/* Structure of store data
 * {
     forms: {
         login: {...},
         timesheet: {...},
         job: {...},
         createWorker: {...},
     },
     workers: Map.new(),
     jobs: Map.new()
 * }
*/

function login(st0 = {email: "", password: "", type: "worker", errors: null}, action) {
    switch(action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data)
        default:
            return st0
    }
}

function new_job(st0 = {job_code: "", name: "", budget: 0, description: "", error: null, manager_id: null}, action) {
    switch(action.type) {
        case 'CHANGE_NEW_JOB': 
            return Object.assign({}, st0, action.data)
        default:
            return st0
    }
}

function new_worker(st0 = {name: "", email: "", pay: "", password: "", manager_id: null, errors: null}, action) {
    switch(action.type) {
        case 'CHANGE_NEW_WORKER':
            return Object.assign({}, st0, action.data)
        default:
            return st0
    }
}

function new_task(st0 = {job_code: "", hours: 0, errors: null, timesheet_id: null}, action) {
    switch(action.type) {
        case 'CHANGE_NEW_TASK':
            return Object.assign({}, st0, action.data)
        case 'CLEAR_TASK':
            return {job_code: "", hours: 0, errors: null, timesheet_id: null}
        case 'TASK_DATE_CHANGED':
            return Object.assign({}, st0, action.data)
        default:
            return st0
    }
}

function new_timesheet(st0 = {date: "", approved: false, errors: null, id: null, worker_id: null}, action) {
    switch(action.type) {
        case 'CHANGE_NEW_TIMESHEET':
            return Object.assign({}, st0, action.data)
        case 'CLEAR_TIMESHEET':
            return {date: "", approved: false, errors: null, id: null}
        default:
            return st0
    }
} 

function forms(st0, action) {
    let reducer = combineReducers({
        login,
        new_job,
        new_worker,
        new_task,
        new_timesheet
    })
    return reducer(st0, action)
}

function workers(st0 = new Map(), action) {
    switch(action.type) {
        case 'GET_USER_LIST':
            let st1 = new Map(st0)
            action.data.workers.forEach((worker) => {
                st1.set(worker.id, worker)
            })
            return st1
        case 'NEW_WORKER':
            st1 = new Map(st0)
            st1.set(action.data.id, action.data)
            return st1
        case 'DELETE_WORKER':
            st1 = new Map(st0)
            st1.delete(action.data)
            return st1
        default:
            return st0
    }
}

function jobs(st0 = new Map(), action) {
    switch(action.type) {
        case 'GET_JOBS':
            let st1 = new Map(st0)
            action.data.forEach((job) => {
                st1.set(job.id, job)
            })
            return st1
        case 'NEW_JOB':
            st1 = new Map(st0)
            st1.set(action.data.id, action.data)
            return st1
        default:
            return st0
    }
}

function tasks(st0 = new Map(), action) {
    switch(action.type) {
        case 'ADD_TASK':
            let st1 = new Map(st0)
            st1.set(action.data.job_code, action.data)
            return st1
        case "CLEAR_TASKS":
            return new Map()
        default:
            return st0
    }
}

function timesheets(st0 = new Map(), action) {
    switch(action.type) {
        case 'GET_TIMESHEETS':
            let st1 = new Map(st0)
            action.data.forEach((timesheet) => {
                st1.set(timesheet.id, timesheet)
            })
            return st1
        case 'SHOW_TIMESHEET':
            let st2 = action.data
            return st2  
        default:
            return st0
    }
}

let session0 = localStorage.getItem('session')
if(session0) {
    session0 = JSON.parse(session0)
}

function session(st0 = session0, action) {
    switch(action.type) {
        case 'LOG_IN':
            return action.data
        case 'LOG_OUT':
            return null
        default:
            return st0
    }
}


function root_reducer(st0, action) {
    let reducer = combineReducers({
        forms,
        session,
        workers,
        jobs,
        tasks,
        timesheets
    })
    return deepFreeze(reducer(st0, action))
}

let store = createStore(root_reducer)
export default store
