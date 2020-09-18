import fetch from 'dva/fetch'

const baseApi = 'http://120.25.124.250:8150';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  console.log(response, 'response')
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return fetch(baseApi + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch((err) => {
      console.log(err, 'err')
    } );
}