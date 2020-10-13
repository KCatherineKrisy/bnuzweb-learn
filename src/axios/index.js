import axios from 'axios'
import { Modal } from 'antd'

class Axios {
  static ajax(options) {
    return new Promise((resolve, reject) => {
        let baseApi = 'http://120.25.124.250:8150/';
        options.headers = {
          'Content-Type': 'application/json',
          ...options.headers,
        }
        console.log(options)
        axios({
            headers: options.headers,
            url: options.url,
            method: options.method,
            baseURL: baseApi,
            timeout: 5000,
            params: (options.data && options.data.params) || ''
        }).then((response) => {
            if(response.status === 200) {
                let res = response.data;
                console.log(res, 'res');
                // if(res.code === 0) {
                //     resolve(res);
                // } else {
                //     Modal.info({
                //         title: "提示",
                //         content: res.data.msg
                //     })
                // }
            } else {
                reject(response.message);
            }
        })
    })
  }
}

export default Axios;