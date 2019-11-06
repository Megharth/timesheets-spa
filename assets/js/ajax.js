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
  console.log(data)

  post('/sessions', data).then(resp => {
    console.log(resp)
    if(resp.token) {
      localStorage.setItem('session', JSON.stringify(resp))
      store.dispatch({
        type: 'LOG_IN',
        data: resp
      })
      form.redirect('/welcome')
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
    if(resp.data) {
      store.dispatch({
        type: 'GET_LIST',
        data: resp.data
      })
    } else {
      console.log(resp.errors)
    }
  })
}