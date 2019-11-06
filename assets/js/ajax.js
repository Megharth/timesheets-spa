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

export function getManager(id) {
    get('/managers/' + id).then(resp => console.log(resp))
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
  console.log(data)
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
  console.log(data)
  post('/workers', {worker: data}).then(resp => {
    if(resp.data) {
      store.dispatch({
        type: 'NEW_WORKER',
        data: resp.data
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