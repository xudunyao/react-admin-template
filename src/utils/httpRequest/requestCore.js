import hash from 'object-hash'
const controllerMap = new Map()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const shouldRetry = (error) => {
  const code = error?.code
  const status = error?.response?.status
  // 取消请求不重试
  if (code === 'ERR_CANCELED') return false
  // 网络错误 / 超时
  if (!status) return true
  // 5xx 才重试
  return status >= 500
}

const buildKey = (method, url, config, data) => {
  return hash({
    method,
    url,
    params: config?.params,
    data,
  })
}

const getDelay = (retry, attempt) => {
  if (typeof retry === 'number') {
    return 0
  }
  if (Array.isArray(retry)) {
    return retry[attempt - 1] ?? 0
  }
  if (typeof retry === 'function') {
    return retry(attempt)
  }
  return 0
}

const getMaxRetry = (retry, retryMax) => {
  if (typeof retry === 'number') return retry
  if (Array.isArray(retry)) return retry.length
  if (typeof retry === 'function') return retryMax
  return 0
}

const requestCore = async (client, method, url, data, config = {}) => {
  const { retry = 0, retryMax = 5, abortRepeat = false, ...axiosConfig } = config
  const key = buildKey(method, url, axiosConfig, data)
  let controller
  try {
    if (abortRepeat) {
      const prev = controllerMap.get(key)
      if (prev) prev.abort()
      controller = new AbortController()
      controllerMap.set(key, controller)
      axiosConfig.signal = controller.signal
    }
    const maxRetry = getMaxRetry(retry, retryMax)
    let attempt = 0
    while (true) {
      try {
        const res =
          method === 'get' || method === 'delete'
            ? await client[method](url, axiosConfig)
            : await client[method](url, data, axiosConfig)
        return res
      } catch (err) {
        if (!shouldRetry(err)) throw err
        if (attempt >= maxRetry) throw err
        attempt++
        const delay = getDelay(retry, attempt)
        if (delay > 0) {
          await sleep(delay)
        }
      }
    }
  } finally {
    if (controllerMap.get(key) === controller) {
      controllerMap.delete(key)
    }
  }
}
export default requestCore
