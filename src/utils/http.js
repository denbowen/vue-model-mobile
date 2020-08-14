import axios from 'axios';

// 请求方法
const METHODS = {
  GET: 'get',
  POST: 'post',
  HEAD: 'head',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  OPTIONS: 'options',
  TRACE: 'trace',
  CONNECT: 'connect',
};

// 请求头里面的content-type
const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'application/x-www-form-urlencoded',
};

// 有消息回应
const onResponse = (res) => {
  const { status } = res;
  if (`${status}` === '200') {
    return res;
  }
  throw res;
};

// 默认拦截返回值方法
const onResolve = (res) => res;

// 默认拦截异常的方法
const onReject = (err) => {
  throw err;
};

const instance = axios.create();

/**
 *
 * @type {{
 * request: 请求方法:参数config:配置,与axios.request的config传参一样;interceptor:拦截器(可不传),
 * instance: AxiosInstance,
 * methods: {TRACE: string, HEAD: string, DELETE: string, POST: string, GET: string, CONNECT: string, OPTIONS: string, PUT: string, PATCH: string},
 * contentTypes: {FORM_DATA: string, JSON: string}
 * }}
 */

// 引用实例
const http = {
  instance,
  methods: METHODS,
  contentTypes: CONTENT_TYPES,
  request: (config = {}, interceptor = { onResolve, onReject }) => {
    const { headers = {} } = config;
    if (!headers['content-type']) {
      headers['content-type'] = CONTENT_TYPES.JSON;
    }
    const { onResolve: resolve, onReject: reject } = interceptor;
    return instance.request(config)
      .then(onResponse)
      .then(resolve)
      .catch(reject);
  },
};

export default http;
