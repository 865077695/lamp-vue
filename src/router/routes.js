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
      { path: 'broadcast-admin', name: '播报设备管理', title: '播报设备管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-device/broadcast-device'], resolve) } },
      { path: 'audio-admin', name: '播报资源管理', title: '播报资源管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-resource/broadcast-resource'], resolve) } },
      { path: 'video-admin', name: '播报计划管理', title: '播报计划管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-plan/broadcast-plan'], resolve) } }
    ]
  },
  {
    path: '/user-analysis',
    component: Main,
    name: 'analysis',
    title: '统计&用户',
    children: [
      { path: 'energy-analysis', name: '能耗统计', title: '能耗统计', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/energy-analysis'], resolve) } },
      { path: 'log', name: '日志统计', title: '日志统计', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/log'], resolve) } },
      { path: 'add-account', name: '添加用户', title: '添加用户', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/add-account'], resolve) } },
      { path: 'user-admin', name: '人员管理', title: '人员管理', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/user-admin'], resolve) } }
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
    { path: 'denggan-admin', name: '灯杆管理', title: '灯杆管理', component: resolve => { require(['@/components/content/lamp/lamp-admin/denggan-admin'], resolve) } },
    { path: 'street-edit', name: '街道信息编辑', title: '街道信息编辑', component: resolve => { require(['@/components/content/lamp/lamp-admin/street-edit'], resolve) } },
    { path: 'light-set', name: '照明设置', title: '照明设置', component: resolve => { require(['@/components/content/lamp/lamp-admin/light-set'], resolve) } },
    { path: 'edit-group', name: '编辑分组', title: '编辑分组', component: resolve => { require(['@/components/content/lamp/lamp-admin/edit-group'], resolve) } },
    { path: 'add-group', name: '新建分组', title: '新建分组', component: resolve => { require(['@/components/content/lamp/lamp-admin/add-group'], resolve) } },
    { path: 'device-admin', name: '设备管理', title: '设备管理', component: resolve => { require(['@/components/content/lamp/lamp-admin/device-admin'], resolve) } },
    { path: 'device-info', name: '设备详情', title: '设备详情', component: resolve => { require(['@/components/content/lamp/broadcast-device/device-info'], resolve) } },
    { path: 'resource-info', name: '资源详情', title: '资源详情', component: resolve => { require(['@/components/content/lamp/broadcast-resource/resource-info'], resolve) } }
  ]
}

// 404
const page404 = { path: '/*', name: 'error-404', title: '404-页面不存在', component: resolve => { require(['@/components/error-page/404.vue'], resolve) } }

export const routes = [otherRoutes, signRouter, ...appRoutes, page404]
