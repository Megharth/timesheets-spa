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
     user: {}
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

function forms(st0, action) {
    let reducer = combineReducers({
        login
    })
    return reducer(st0, action)
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
        session
    })
    return deepFreeze(reducer(st0, action))
}

let store = createStore(root_reducer)
export default store
