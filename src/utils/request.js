import fetch from 'dva/fetch'

const baseApi = 'http://localhost:9001';
let token = localStorage.getItem('bsyx-user-token');

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if(response.status >= 200 && response.status <= 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, data) {
  const options = {
    method: data.method,
    headers: {
      'Content-Type': 'application/json',
      'user-token': token,
      ...data.headers
    },
    body: data.body
  }
  return fetch(baseApi + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch((err) => {
      console.log(err, 'err')
    } );
}