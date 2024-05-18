/*
 * @Date: 2024-05-18 18:39:58
 * @Description:
 */
/*
 * @Date: 2024-05-18 18:39:58
 * @Description:
 */
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * @description: 初始化
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
const getPendingToken = (config: AxiosRequestConfig): string => {
  return `${config.url}|${config.method}`;
};

const reqMap = new Map<string, Canceler>();

// 创建axios实例
const httpInstance = axios.create({
  baseURL: "https://www.npmjs.com/package", // API基础地址
  timeout: 10000, // 请求超时时间
});

httpInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    config.headers["Authorization"] = "Bearer yourToken";

    const reqIdentifier = getPendingToken(config);
    if (reqMap.has(reqIdentifier)) {
      const canceler = reqMap.get(reqIdentifier) as Canceler;
      canceler &&
        canceler("Cancelled due to a new request with the same identifier.");
    }

    config.cancelToken = new axios.CancelToken((cancel) => {
      reqMap.set(reqIdentifier, cancel);
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpInstance.interceptors.response.use(
  (res) => {
    const requestIdentifier = getPendingToken(res.config);
    reqMap.delete(requestIdentifier); // 完成请求后清除记录
    return res;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.error("Error with the response", error);
    }

    const requestIdentifier = getPendingToken(error.config);
    reqMap.delete(requestIdentifier);
    return Promise.reject(error);
  }
);

export default httpInstance;
