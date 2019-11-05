export function post(path, body) {
    return fetch('/ajax' + path, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
          'x-csrf-token': window.csrf_token,
          'content-type': "application/json; charset=UTF-8",
          'accept': 'application/json',
        }),
        body: JSON.stringify(body),
      }).then((resp) => resp.json());
}

export function get(path) {
    return fetch('/ajax' + path, {
        method: 'get',
        credentials: 'same-origin',
        headers: new Headers({
          'x-csrf-token': window.csrf_token,
          'content-type': "application/json; charset=UTF-8",
          'accept': 'application/json',
        })
    }).then(resp => resp.json());
}

export function getManager(id) {
    // console.log(id)
    get('/managers/' + id).then(resp => console.log(resp))
}