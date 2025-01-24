import { runEvent } from '@v-c/utils'
import type { MenuSelectEvent, ProLayoutProps } from './typing'
import { Key } from 'ant-design-vue/es/_util/type'

export interface ProLayoutProviderMethods {
  handleCollapsed?: (collapsed: boolean) => void
}

const layoutStateFunc = (props: ProLayoutProps, methods: ProLayoutProviderMethods = {}) => {
  const logo = computed(() => props.logo)
  const title = computed(() => props.title)
  const layout = computed(() => props.layout)
  const collapsedWidth = computed(() => props.collapsedWidth)
  const siderWidth = computed(() => props.siderWidth)
  const menuData = computed(() => props.menuData)
  const fixedHeader = computed(() => props.fixedHeader)
  const fixedSider = computed(() => props.fixedSider)
  const collapsed = computed(() => props.collapsed)
  const theme = computed(() => props.theme)
  const headerHeight = computed(() => props.headerHeight)
  const contentWidth = computed(() => props.collapsedWidth)
  const copyright = computed(() => props.copyright)
  /**
   * 移动端的处理方式
   */
  const isMobile = computed(() => props.isMobile)
  const mobileCollapsed = shallowRef(false)
  const handleMobileCollapsed = () => {
    mobileCollapsed.value = !mobileCollapsed.value
  }

  const header = computed(() => props.header)
  const menu = computed(() => props.menu)
  const footer = computed(() => props.footer)
  const menuHeader = computed(() => props.menuHeader)

  /**
   * 菜单选中处理
   */
  const openKeys = computed(() => props.openKeys)
  const selectedKeys = computed(() => props.selectedKeys)
  const handleOpenKeys = (keys: Key[]) => {
    runEvent(props['onUpdate:openKeys'], keys)
  }

  const handleSelectedKeys = (keys: Key[]) => {
    runEvent(props['onUpdate:selectedKeys'], keys)
  }

  const handleMenuSelect = (data: MenuSelectEvent) => {
    runEvent(props.onMenuSelect, data)
  }
  return {
    logo,
    title,
    layout,
    collapsed,
    collapsedWidth,
    menuData,
    siderWidth,
    fixedHeader,
    fixedSider,
    headerHeight,
    theme,
    isMobile,
    mobileCollapsed,
    contentWidth,
    copyright,
    handleMobileCollapsed,
    header,
    menu,
    footer,
    openKeys,
    handleOpenKeys,
    selectedKeys,
    handleSelectedKeys,
    handleMenuSelect,
    menuHeader,
    ...methods,
  }
}

const [useLayoutProvider, useLayoutInject] = createInjectionState(layoutStateFunc)

export { useLayoutProvider }

export const useLayoutState = (): ReturnType<typeof layoutStateFunc> => useLayoutInject()!
