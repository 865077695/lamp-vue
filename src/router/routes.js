import Main from '@/components/content/content'
// 这些路由不作为Main组件的子页面展示
const signRouter = { path: '/sign', name: 'sign', title: '登录', component: resolve => { require(['@/components/sign/sign'], resolve) } }
const page404 = { path: '/*', name: 'error-404', title: '404-页面不存在', component: resolve => { require(['@/components/error-page/404.vue'], resolve) } }

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
      { path: 'lamp-admin', name: 'lamp-admin', title: '路灯管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/lamp-admin'], resolve) } },
      { path: 'broadcast-admin', name: 'broadcast-admin', title: '播报管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/broadcast-admin'], resolve) } },
      { path: 'audio-admin', name: 'audio-admin', title: '音频管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/audio-admin'], resolve) } },
      { path: 'video-admin', name: 'video-admin', title: '视频管理', icon: 'document-text', component: resolve => { require(['@/components/content/lamp/video-admin'], resolve) } }
    ]
  },
  {
    path: '/user-analysis',
    component: Main,
    name: 'analysis',
    title: '统计&用户',
    children: [
      { path: 'energy-analysis', name: 'energy-analysis', title: '能耗统计', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/energy-analysis'], resolve) } },
      { path: 'log', name: 'log', title: '日志统计', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/log'], resolve) } },
      { path: 'add-account', name: 'add-account', title: '添加用户', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/add-account'], resolve) } },
      { path: 'user-admin', name: 'user-admin', title: '人员管理', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/user-admin'], resolve) } },
      { path: 'area-admin', name: 'area-admin', title: '区域管理', icon: 'document-text', component: resolve => { require(['@/components/content/analysis/area-admin'], resolve) } }
    ]
  }
]

export const routes = [{ path: '', redirect: '/home' }, signRouter, ...appRoutes, page404]
