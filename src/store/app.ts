import { defineStore } from 'pinia'
import { theme as antdTheme } from 'ant-design-vue/es'
import globalSetting from '@/config/global-setting.ts'
import { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { ContentWidth, LayoutType, ThemeType } from '@/layouts/basic-layout/typing.ts'

export interface LayoutSetting {
  title?: string
  logo?: string
  theme: ThemeType
  collapsed: boolean
  drawerVisible: boolean
  colorPrimary?: string
  layout?: LayoutType
  contentWidth?: ContentWidth
  fixedHeader?: boolean
  fixedSider?: boolean
  splitMenus?: boolean
  header?: boolean
  footer?: boolean
  menu?: boolean
  menuHeader?: boolean
  colorWeak?: boolean
  multiTab?: boolean
  multiTabFixed?: boolean
  headerHeight?: number
  copyright?: string
}

export const useAppStore = defineStore('app', () => {
  const layoutSetting = reactive(globalSetting)
  // 加上 any就是解决编辑器无法序列化过长的类型
  const themeConfig = reactive<ThemeConfig | any>({
    algorithm: [antdTheme.defaultAlgorithm],
    token: {
      colorBgContainer: '#fff',
      colorPrimary: layoutSetting.colorPrimary,
    },
    components: {},
  })
  const toggleCollapsed = (collapsed: boolean) => {
    layoutSetting.collapsed = collapsed
  }
  return { layoutSetting, theme: themeConfig, toggleCollapsed }
})
