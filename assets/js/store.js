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