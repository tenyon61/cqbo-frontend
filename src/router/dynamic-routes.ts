import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')
const basicRouteMap = {
  // iframe模式下使用
  Iframe: () => import('@/views/common/Iframe.vue'),
  // 一般用于存在子集的页面
  RouteView: () => import('@/views/common/CusRouteView.vue'),
}
// 路由菜单
const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: basicRouteMap.RouteView,
    meta: {
      title: '控制台',
      icon: 'ri:dashboard-3-line',
    },
  },
  {
    path: '/system',
    name: 'system',
    redirect: '/system/userlist',
    component: basicRouteMap.RouteView,
    meta: {
      title: '后台管理',
      icon: 'ri:settings-3-line',
    },
    children: [
      {
        path: '/system/userlist',
        name: 'userlist',
        component: () => import('@/views/system/user/UserList.vue'),
        meta: {
          title: '用户管理',
        },
      },
      {
        path: '/system/rolelist',
        name: 'rolelist',
        component: () => import('@/views/system/role/RoleList.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        path: '/system/menulist',
        name: 'menulist',
        component: () => import('@/views/system/menu/MenuList.vue'),
        meta: {
          title: '菜单管理',
        },
      },
      {
        path: '/system/demo',
        name: 'demo',
        component: () => import('@/views/Demo.vue'),
        meta: {
          title: '测试组件',
        },
      },
    ],
  },
]
export default dynamicRoutes
