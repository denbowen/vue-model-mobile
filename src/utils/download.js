import querystring from 'querystring';

const URL = '';
const HEADER = {};
const METHOD = 'GET';
const TIMEOUT = 4200000;
const PARAM = {};
const DATA = null;
const ERR_TYPES = ['application/json', 'text/html', 'text/xml', '', null, undefined];
const NAME = '';

/**
 * @type 下载文件
 * @param 类型：object，字段包含：url：路径；header：请求头，默认为{};method：请求方式，默认为GET；param: url拼接参数，默认为{}；
 * data：请求体参数；timeout：最大延迟时间，默认是420000毫秒(7分钟)；name：下载文件的名字，默认为空。
 * @returns {Promise<unknown>}
 */
export const download = (obj = {}) => {
  let { url = URL } = obj;
  const { header = HEADER } = obj;
  const { param = PARAM } = obj;
  const { data = DATA } = obj;
  const { method = METHOD } = obj;
  const { timeout = TIMEOUT } = obj;
  const { name = NAME } = obj;

  const urlParam = querystring.stringify(param);
  if (urlParam) {
    url = `${url}?${urlParam}`;
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.open(method, url, true); // 也可以使用POST方式，根据接口
    Reflect.ownKeys(header).forEach((field) => {
      xhr.setRequestHeader(field, header[field]);
    });
    xhr.responseType = 'blob'; // 返回类型blob，XMLHttpRequest支持二进制流类型
    xhr.onload = () => {
      if (xhr.status === 200) {
        const { response } = xhr;
        const { type } = response;
        if (ERR_TYPES.includes(type)) {
          response.text().then((res) => {
            try {
              const errContent = JSON.parse(res);
              reject(errContent);
            } catch (err) {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({
                message: '下载异常',
                err,
              });
            }
          });
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(response); // 转换为base64，可以直接放入a标签href
          reader.onload = (e) => {
            // 转换完成，创建一个a标签用于下载
            const a = document.createElement('a');
            a.download = name;
            a.href = e.target.result;
            a.click();
            resolve();
          };
          reader.onerror = (err) => {
            reject({
              message: '读写文件失败',
              err,
            });
          };
        }
      }
    };
    xhr.onerror = (err) => {
      reject({
        message: '网络异常',
        err,
      });
    };
    xhr.send(data);
  });
};
