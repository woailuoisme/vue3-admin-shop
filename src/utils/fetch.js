import { stringify } from "query-string"

export const sendRequest = ({ url, method, useCredentials = false, body, headers = {}, queryParams = {} }) => {
  const options = {
    method: method,
    headers: new Headers({ "content-type": "application/json", ...headers }), // by default setting the content-type to be json type
    body: body ? JSON.stringify(body) : null,
  }
  if (useCredentials) options.credentials = "include"
  if (queryParams) {
    url = `${url}?${stringify(queryParams)}`
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        throw Promise.reject({
          status: res.status,
          ok: false,
          message: json.message,
          body: json,
        })
      })
    }
  })
}
