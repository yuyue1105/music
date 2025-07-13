import { defineConfig } from '@umijs/max';
import { routes } from './routes';

const projectName='jx-standard-template-pro-web';

export default defineConfig({
  hash: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '玖欣物联',
  },
  outputPath: `dist/${projectName}`,
  history: { type: 'hash' },
  historyWithQuery:{},
  jsMinifier: 'terser',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  define: { 
    'process.env.projectName': projectName 
  },
  routes,
  npmClient: 'yarn',
  proxy:{
    '/jx-user-service/': {
      // target: 'http://192.168.0.42:7400/',
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    },
    '/jx-auth-service/': {
      // target: 'http://192.168.0.42:7400/',
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    },
    '/jx-equipment-service/': {
      // target: 'http://192.168.0.42:7400/',
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    },
    '/jz-digital-service/': {
      // target: 'http://192.168.0.42:7400/',
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    },
    '/jz-digital-workflow-service/': {
      // target: 'http://192.168.0.42:7400/',
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    },
    '/jx-file-service/': {
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    },
    '/jx-zzy-wms-service/': {
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    },
    '/jx-iig-service/': {
      target: 'https://appstore.dev.jiuxiniot.com/',
      // target: 'https://appstore.test.jiuxiniot.com/',
      changeOrigin: true,
    }
  },
  targets:{
    ie: 9
  }
});
