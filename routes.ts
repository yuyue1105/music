//采用一级平铺定义路由，禁止嵌套定义路由
export const routes = [
  {
    path: '/',
    redirect: '/user/login',
    layout: false
  },
  {
    name: '登录',
    path: '/user/login',
    component: './Login', 
    layout: false
  },
  {
    name: '模板',
    path: '/template',
    component: './Template',
    layout: false
  },
  {
    name: '模板echarts',
    path: '/templateEcharts',
    component: './TemplateEcharts',
    layout: false
  },
  {
    name: '模板埋点',
    path: '/templateEventTracking',
    component: './TemplateEventTracking',
    layout: false
  },
  {
    name: '模板ProTable列表',
    path: '/templateProTable',
    component: './TemplateProTable',
    layout: false
  },
  {
    name: '模板ProTable详情',
    path: '/templateProTableDetailPage',
    component: './TemplateProTableDetailPage',
    layout: false,
  },
  {
    name: '404',
    path:'/*',
    component: './404',
    layout: false,
  },
]