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
      { path: '', name: 'home', title: '首页', component: resolve => { require(['@/components/content/home/home'], resolve) } }
    ]
  },
  {
    path: '/lamp',
    component: Main,
    name: 'lamp',
    title: '路灯管理',
    children: [
      { path: 'lamp-admin', name: '路灯管理', title: '路灯管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/lamp-admin/lamp-admin'], resolve) } },
      { path: 'broadcast-admin', name: '播报管理', title: '播报管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-admin'], resolve) } },
      { path: 'audio-admin', name: '音频管理', title: '音频管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/audio-admin'], resolve) } },
      { path: 'video-admin', name: '视频管理', title: '视频管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/video-admin'], resolve) } }
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
      { path: 'user-admin', name: '人员管理', title: '人员管理', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/user-admin'], resolve) } },
      { path: 'area-admin', name: '区域管理', title: '区域管理', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/area-admin'], resolve) } }
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
    { path: 'denggan-admin', name: '灯杆管理', title: '灯杆管理', component: resolve => { require(['@/components/content/lamp/lamp-admin/denggan-admin'], resolve) } }
  ]
}

// 404
const page404 = { path: '/*', name: 'error-404', title: '404-页面不存在', component: resolve => { require(['@/components/error-page/404.vue'], resolve) } }

export const routes = [otherRoutes, signRouter, ...appRoutes, page404]
console.log(routes)
