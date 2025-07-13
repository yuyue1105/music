// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import 'dayjs/locale/zh-cn';
import type { RequestConfig } from 'umi';
import { message } from 'antd';
import { goLogin } from './utils';


export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    pure: true,
  };
};

// if ((!localStorage.getItem('token')) && (!location.href.includes('/user/login'))) {
//   localStorage.removeItem('userInfo');
//   localStorage.removeItem('currentUserInfo');
//   goLogin();
// }

export const request: RequestConfig = {
  errorConfig: {
    errorHandler: (err: any) => {
      if (err?.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('currentUserInfo');
        goLogin();
      }
    }
  },
  requestInterceptors: [
    (url, options) => {
      return {
        url,
        options: options,
      };
    }
  ],
  responseInterceptors: [
    (response: any) => {
      return response;
    }
  ]
};

