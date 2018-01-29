import Main from '@/components/content/content'
// 这些路由不作为Main组件的子页面展示
const signRouter = { path: '/sign', name: 'sign', title: '登录', component: resolve => { require(['@/components/sign/sign'], resolve) } }

// 这些路由作为Main页面的子页面展示并且要展示在左侧菜单中
export const appRoutes = [
  {
    path: '/home',
    component: Main,
    name: '',
    title: '首页',
    icon: 'document-text',
    children: [
      { path: '', name: '首页', title: '首页', component: resolve => { require(['@/components/content/home/home'], resolve) } }
    ]
  },
  {
    path: '/lamp',
    component: Main,
    name: 'lamp',
    title: '路灯管理',
    children: [
      { path: 'street-admin', name: '路灯管理', title: '路灯管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/lamp-admin/street/street-admin'], resolve) } },
      // { path: 'broadcast-admin', name: '播报设备管理', title: '播报设备管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-device/broadcast-device'], resolve) } },
      { path: 'broadcast-resource', name: '播报资源管理', title: '播报资源管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-resource/broadcast-resource'], resolve) } },
      { path: 'broadcast-plan', name: '播报计划管理', title: '播报计划管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-plan/broadcast-plan'], resolve) } }
    ]
  },
  {
    path: '/user-analysis',
    component: Main,
    name: 'analysis',
    title: '统计&用户',
    children: [
      { path: 'power', name: '能耗统计', title: '能耗统计', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/power/power'], resolve) } },
      { path: 'log', name: '日志统计', title: '日志统计', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/log/log'], resolve) } },
      { path: 'alert-notice', name: '报警消息', title: '报警消息', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/alert-notice/alert-notice'], resolve) } },
      { path: 'user-admin', name: '人员管理', title: '人员管理', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/user-admin/user-admin'], resolve) } }
      // { path: 'area-admin', name: '区域管理', title: '区域管理', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/area-admin'], resolve) } }
    ]
  }
]

// 二级路由，但是不在leftBar显示的
const otherRoutes = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'lamp-admin', name: '灯杆管理', title: '灯杆管理', component: resolve => { require(['@/components/content/lamp/lamp-admin/street/lamp-admin'], resolve) } },
    { path: 'device-admin', name: '设备管理', title: '设备管理', component: resolve => { require(['@/components/content/lamp/lamp-admin/street/device-admin'], resolve) } },
    { path: 'street-edit', name: '街道信息编辑', title: '街道信息编辑', component: resolve => { require(['@/components/content/lamp/lamp-admin/street/street-edit'], resolve) } },
    { path: 'lamp-group', name: '分组设置', title: '分组设置', component: resolve => { require(['@/components/content/lamp/lamp-admin/street/lamp-group'], resolve) } },
    { path: 'plan-info', name: '计划详情', title: '计划详情', component: resolve => { require(['@/components/content/lamp/broadcast-plan/plan-info'], resolve) } }
    // { path: 'device-info', name: '设备详情', title: '设备详情', component: resolve => { require(['@/components/content/lamp/broadcast-device/device-info'], resolve) } }
  ]
}

// 404
const page404 = { path: '/*', name: 'error-404', title: '404-页面不存在', component: resolve => { require(['@/components/error-page/404.vue'], resolve) } }

export const routes = [otherRoutes, signRouter, ...appRoutes, page404]
