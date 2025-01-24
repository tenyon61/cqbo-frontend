import { LayoutSetting } from '@/store/app.ts'

export default {
  title: 'BMS管理系统',
  theme: 'light',
  logo: '/logo.svg',
  collapsed: false,
  drawerVisible: false,
  colorPrimary: '#FA541C',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixedSider: true,
  splitMenus: false,
  header: true,
  menu: true,
  menuHeader: true,
  footer: false,
  colorWeak: false,
  multiTab: true,
  multiTabFixed: true,
  headerHeight: 48,
  copyright: 'Yovvis 2025',
} as LayoutSetting
