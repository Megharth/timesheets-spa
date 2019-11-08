import store from './store'

export function post(path, body) {
  let state = store.getState()
  let session = state.session
    return fetch('/ajax' + path, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
          'x-csrf-token': window.csrf_token,
          'content-type': "application/json; charset=UTF-8",
          'accept': 'application/json',
          'x-auth': session ? session.token : "",
        }),
        body: JSON.stringify(body),
      }).then((resp) => resp.json())
}

export function remove(path) {
  let state = store.getState()
  let session = state.session
    return fetch('/ajax' + path, {
        method: 'delete',
        credentials: 'same-origin',
        headers: new Headers({
          'x-csrf-token': window.csrf_token,
          'content-type': "application/json; charset=UTF-8",
          'accept': 'application/json',
          'x-auth': session ? session.token : "",
        }),
      })
}

export function get(path) {
  let state = store.getState()
  let session = state.session
    return fetch('/ajax' + path, {
        method: 'get',
        credentials: 'same-origin',
        headers: new Headers({
          'x-csrf-token': window.csrf_token,
          'content-type': "application/json; charset=UTF-8",
          'accept': 'application/json',
          'x-auth': session ? session.token : "",
        })
    }).then(resp => resp.json())
}

export function update(path, body) {
  let state = store.getState()
  let session = state.session
  return fetch('/ajax' + path, {
      method: 'put',
      credentials: 'same-origin',
      headers: new Headers({
        'x-csrf-token': window.csrf_token,
        'content-type': "application/json; charset=UTF-8",
        'accept': 'application/json',
        'x-auth': session ? session.token : "",
      }),
      body: JSON.stringify(body),
  }).then(resp => resp.json())
}


export function submit_login(form) {
  let state = store.getState()
  let data = state.forms.login
  post('/sessions', data).then(resp => {
    if(resp.token) {
      localStorage.setItem('session', JSON.stringify(resp))
      store.dispatch({
        type: 'LOG_IN',
        data: resp
      })
      form.redirect('/' + resp.user_type + '/dashboard')
    } else {
      store.dispatch({
        type: 'CHANGE_LOGIN',
        data: {errors: JSON.stringify(resp.errors)},
      });
    }
  })
}

export function get_workers(id) {
  get('/managers/'+id).then(resp => {
    store.dispatch({
      type: 'GET_USER_LIST',
      data: resp.data
    })
  })
}

export function get_jobs() {
  get('/jobs').then(resp => {
    store.dispatch({
      type: 'GET_JOBS',
      data: resp.data
    })
  })
}

export function add_job(form) {
  let state = store.getState()
  let data = state.forms.new_job
  post('/jobs', {job: data}).then(resp => {
    if(resp.data) {
      store.dispatch({
        type: 'NEW_JOB',
        data: resp.data
      })
      form.redirect('/jobs')
    } else {
      store.dispatch({
        type: 'CHANGE_NEW_JOB',
        data: {errors: JSON.stringify(resp.errors)},
      });
    }
  })
}

export function add_worker(form) {
  let state = store.getState()
  let data = state.forms.new_worker
  post('/workers', {worker: data}).then(resp => {
    if(resp) {
      store.dispatch({
        type: 'NEW_WORKER',
        data: resp
      })
      form.redirect('/manager/dashboard')
    } else {
      store.dispatch({
        type: 'CHANGE_NEW_WORKER',
        data: {errors: JSON.stringify(resp.errors)},
      });
    }
  })
}

export function delete_worker(id) {
  remove('/workers/' + id).then(resp => {
    store.dispatch({
      type: 'DELETE_WORKER',
      data: id
    })
  })
}

export function add_tasks(form, channel) {
  let state = store.getState()
  let data = state.tasks
  let tasks = Array.from(data, ([key, task]) => {
    return task
  })
  let hours = tasks.reduce((acc, task) => acc + parseInt(task.hours), 0)
  if(hours < 8) 
    channel.push("notify_manager", {name: state.session.user_name, hours})
  
  let add_task
  tasks.forEach((task) => {
    add_task = post('/tasks', {task})
  })

  add_task.then(resp => {
    store.dispatch({
      type: 'GET_TIMESHEETS',
      data: [state.forms.new_timesheet]
    })
    store.dispatch({
      type: 'CLEAR_TIMESHEET',
      data: null
    })
    store.dispatch({
      type: 'CLEAR_TASK',
      data: null
    })
    store.dispatch({
      type: 'CLEAR_TASKS',
      data: null
    })
  })
  form.redirect('/worker/dashboard')
  // post('/tasks', {task: data}).then(resp => console.log(resp))
}

export function add_timesheet() {
  let state = store.getState()
  let data = state.forms.new_timesheet
  if(data.date !== "") { 
   post('/timesheets', {timesheet: data}).then(resp => {
     if(resp.errors) {
        store.dispatch({
          type: 'CHANGE_NEW_TIMESHEET',
          data: {
            errors: resp.errors
          }
        })
     } else {
        store.dispatch({
          type: 'CHANGE_NEW_TIMESHEET',
          data: {
            id: resp.data.id
          }
        })
     }
     
   })
  } else {
    store.dispatch({
      type: 'CHANGE_NEW_TIMESHEET',
      data: {errors: ["Date cannot be empty"]}
    })
  }
}

export function get_timesheets(worker_id) {
  get('/workers/' + worker_id).then(resp => {
    if(resp.data) {
      store.dispatch({
        type: 'GET_TIMESHEETS',
        data: resp.data.timesheets
      })
    }
  })
}

export function get_timesheet(timesheet_id) {
  get('/timesheets/' + timesheet_id).then(resp => {
    store.dispatch({
      type: 'SHOW_TIMESHEET',
      data: resp.data
    })
  })
}