import httpClient from './httpClient'
import requestCore from './requestCore'

// 调用示例：
// 不传 retry：默认 retry = 0（不重试）
// request.get('/users')
// GET 传参（会拼到 query string）
// request.get('/users', { params: { page: 1, pageSize: 20, keyword: 'tom' } })
// 重试次数：数字（立即重试，不等待）
// request.get('/users', { retry: 2 })
// 重试间隔：数组（单位 ms）
// request.get('/users', { retry: [200, 500, 1000] })
// 重试间隔：函数 + 最大重试次数上限
// request.get('/users', { retry: (attempt) => attempt * 300, retryMax: 5 })
// 取消重复请求：同 method + url + params/data 的新请求会取消旧请求
// request.get('/users', { params: { page: 1 }, abortRepeat: true })
// request.post('/users', { name: 'Tom' }, { abortRepeat: true })
// POST 重试：数字
// request.post('/users', { name: 'Tom' }, { retry: 1 })
// POST 重试：数组
// request.post('/users', { name: 'Tom' }, { retry: [300, 600] })
// POST 重试：函数 + 上限
// request.post('/users', { name: 'Tom' }, { retry: (attempt) => 200 * 2 ** (attempt - 1), retryMax: 4 })

const request = {
  get(url, config) {
    return requestCore(httpClient, 'get', url, undefined, config)
  },

  post(url, data, config) {
    return requestCore(httpClient, 'post', url, data, config)
  },

  put(url, data, config) {
    return requestCore(httpClient, 'put', url, data, config)
  },

  patch(url, data, config) {
    return requestCore(httpClient, 'patch', url, data, config)
  },

  delete(url, config) {
    return requestCore(httpClient, 'delete', url, undefined, config)
  },
}

export default request
