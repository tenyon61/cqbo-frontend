<script setup lang="ts">
import { MenuFoldOutlined } from '@ant-design/icons-vue'
import { useLayoutState } from '../../basic-layout/context'
import GlobalHeaderLogo from './global-header-logo.vue'
const { layout, isMobile, handleMobileCollapsed, theme, menuHeader } = useLayoutState()
const prefixCls = shallowRef('ant-pro-global-header')
const cls = computed(() => ({
  [prefixCls.value]: true,
  [`${prefixCls.value}-layout-${layout.value}`]: !!layout.value,
  [`${prefixCls.value}-inverted`]: theme.value === 'inverted' && layout.value === 'top',
}))
</script>

<template>
  <div :class="cls">
    <template v-if="menuHeader">
      <GlobalHeaderLogo v-if="layout !== 'side' || isMobile" />
    </template>
    <span
      v-if="isMobile"
      class="ant-pro-global-header-collapsed-button"
      @click="handleMobileCollapsed"
    >
      <MenuFoldOutlined />
    </span>
    <div class="flex-1">
      <slot name="headerContent" />
    </div>
    <a-space align="center" flex-shrink-0>
      <slot name="headerActions" />
    </a-space>
  </div>
</template>

<style lang="scss">
.ant-pro-global-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 24px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  > * {
    height: 100%;
  }

  &-collapsed-button {
    display: flex;
    font-size: 20px;
    align-items: center;
    margin-left: 24px;
  }

  &-logo {
    position: relative;
    overflow: hidden;

    a {
      display: flex;
      align-items: center;
      height: 100%;

      img {
        height: 28px;
      }
      h1 {
        height: 32px;
        margin: 0 0 0 12px;
        font-weight: 600;
        font-size: 18px;
        line-height: 32px;
      }
    }
  }

  &-layout-mix {
    background: #001529;
    .anticon {
      color: #fff;
    }
  }

  &-layout-mix &-logo {
    h1 {
      color: #fff;
    }
  }
  .ant-menu-horizontal {
    border-bottom: none !important;
  }

  &-inverted {
    --hover-color: rgb(42, 44, 55);
    color: rgba(229, 224, 216, 0.85);
    background: #001529;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .ant-pro-top-nav-header {
      &-logo {
        h1 {
          color: rgb(229, 224, 216);
        }
      }
    }
  }
}

.ant-pro-top-nav-header-logo {
  position: relative;
  min-width: 165px;
  height: 100%;
  overflow: hidden;
  margin-right: 25px;

  img {
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }

  h1 {
    display: inline-block;
    margin: 0 0 0 12px;
    font-size: 16px;
    vertical-align: top;
    color: rgba(0, 0, 0, 0.85);
  }
}

[data-theme='dark'] .ant-pro-top-nav-header-logo {
  h1 {
    color: rgba(229, 224, 216, 0.85);
  }
}

[data-theme='dark'] .ant-pro-global-header {
  background: #001529;
  box-shadow: rgba(13, 13, 13, 0.65) 0px 2px 8px 0px;

  &-layout-mix {
    background: rgb(15, 28, 41);

    .anticon {
      color: rgb(229, 224, 216);
    }

    .ant-pro-global-header {
      &-logo {
        h1 {
          color: rgb(229, 224, 216);
        }
      }
    }
  }

  &-layout-top,
  &-layout-side {
    background-color: rgb(36, 37, 37);
  }
}
</style>
