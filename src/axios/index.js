import axios from 'axios'
import { Modal } from 'antd'

class Axios {
  static ajax(options) {
    return new Promise((resolve, reject) => {
      let baseApi = 'http://120.25.124.250:8150';
      axios({
        url: options.url,
        method: options.method,
        baseURL: baseApi,
        timeout: 5000,
        params: (options && options.data) || ''
      }).then((response) => {
        if(response.status === 200) {
          let res = response.data;
          if(res.code === 20000) {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.data.msg
            })
          }
        } else {
          reject(response.message)
        }
      }).catch((err) => {
        console.log('err', err)
        reject(err.message)
      })
    })
  }
}

export default Axios;