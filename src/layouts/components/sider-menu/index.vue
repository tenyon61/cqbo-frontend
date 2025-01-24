<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import type { CSSProperties } from 'vue'
import { useLayoutState } from '../../basic-layout/context'
import Menu from '../menu/index.vue'
const {
  collapsed,
  handleCollapsed,
  layout,
  logo,
  theme,
  title,
  collapsedWidth,
  siderWidth,
  headerHeight,
  fixedSider,
  isMobile,
} = useLayoutState()

const prefixCls = shallowRef('ant-pro-sider')

const siderStyle = computed<CSSProperties>(() => {
  return {
    paddingTop: `${layout.value !== 'side' && !isMobile.value ? headerHeight.value : 0}px`,
    transition:
      'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
    overflow: 'hidden',
  }
})

const cls = computed(() => ({
  [prefixCls.value]: true,
  [`${prefixCls.value}-fixed`]: fixedSider.value,
  [`${prefixCls.value}-layout-${layout.value}`]: !!layout.value,
}))

const showLogo = computed(() => {
  return (layout.value === 'side' || isMobile.value) && layout.value !== 'mix'
})
</script>

<template>
  <div
    v-if="fixedSider"
    :style="{
      width: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      maxWidth: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      minWidth: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      ...siderStyle,
    }"
  />
  <a-layout-sider
    :theme="theme === 'inverted' ? 'dark' : 'light'"
    :collapsed="collapsed && !isMobile"
    :trigger="null"
    :collapsed-width="collapsedWidth"
    :width="siderWidth"
    collapsible
    :class="cls"
    :style="siderStyle"
  >
    <div
      v-if="showLogo"
      class="ant-pro-sider-logo"
      :class="collapsed && !isMobile ? 'ant-pro-sider-collapsed' : ''"
    >
      <a>
        <img :src="logo" />
        <h1 v-if="!collapsed || isMobile">{{ title }}</h1>
      </a>
    </div>
    <div class="flex-1 of-x-hidden of-y-auto">
      <Menu />
    </div>
    <div
      v-if="!isMobile"
      class="w-100% flex-shrink-0 ant-pro-sider-collapsed-button"
      :class="theme === 'inverted' ? 'ant-pro-sider-collapsed-button-inverted' : ''"
    >
      <a-menu
        class="ant-pro-sider-menu"
        mode="inline"
        :theme="theme === 'inverted' ? 'dark' : 'light'"
        :selectable="false"
        @click="handleCollapsed?.(!collapsed)"
      >
        <a-menu-item>
          <template #icon>
            <MenuFoldOutlined v-if="collapsed" />
            <MenuUnfoldOutlined v-else />
          </template>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<style lang="scss">
.ant-pro-sider {
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &-fixed {
    position: fixed !important;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  }

  &-menu {
    position: relative;
    z-index: 10;
    min-height: 100%;
    border-inline-end: none !important;
  }

  &-collapsed-button {
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  &-collapsed-button-inverted {
    border-top: 1px solid rgba(143, 132, 117, 0.06);
  }

  &-light {
    .ant-menu-light {
      border-right-color: transparent;
    }
  }

  &-logo {
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    cursor: pointer;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    > a {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 32px;
    }

    img {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
    }

    h1 {
      display: inline-block;
      height: 32px;
      margin: 0 0 0 12px;
      font-weight: 600;
      font-size: 18px;
      line-height: 32px;
      vertical-align: middle;
      animation: pro-layout-title-hide 0.3s;
    }
  }

  &-collapsed {
    padding: 16px 8px;
  }
}

[data-theme='dark'] .ant-pro-sider {
  &-collapsed-button {
    border-top: 1px solid rgba(143, 132, 117, 0.06);
  }

  &-fixed {
    box-shadow: rgba(13, 13, 13, 0.65) 0px 2px 8px 0px;
  }
}

@keyframes pro-layout-title-hide {
  0% {
    display: none;
    opacity: 0;
  }

  80% {
    display: none;
    opacity: 0;
  }

  to {
    display: unset;
    opacity: 1;
  }
}
</style>
