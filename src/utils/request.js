import axios from 'axios';
import store from '@/store';
import storage from 'store';
import notification from 'ant-design-vue/es/notification';
import { VueAxios } from './axios';
import { ACCESS_TOKEN } from '@/store/mutation-types';

// 异常拦截处理器
const errorHandler = error => {
  if (error.response) {
    const data = error.response.data;
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN);
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      });
    }
    if (error.response.status === 500) {
      notification.error({
        message: '服务器错误',
        description: data.message
      });
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      });
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      }
    }
  }
  return Promise.reject(error);
};

// request interceptor
axios.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN);
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  config.headers['X-Requested-With'] = 'XMLHttpRequest ';
  return config;
}, errorHandler);

// response interceptor
axios.interceptors.response.use(response => {
  return response.data;
}, errorHandler);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, axios);
  }
};

export default axios;

export { installer as VueAxios, axios };
