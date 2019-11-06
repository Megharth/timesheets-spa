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

function new_worker(st0 = {name: "", email: "", pay: "", password_hash: "", manager_id: null, errors: null}, action) {
    switch(action.type) {
        case 'CHANGE_NEW_WORKER':
            return Object.assign({}, st0, action.data)
        default:
            return st0
    }
}

function forms(st0, action) {
    let reducer = combineReducers({
        login,
        new_job,
        new_worker
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
        jobs
    })
    return deepFreeze(reducer(st0, action))
}

let store = createStore(root_reducer)
export default store
