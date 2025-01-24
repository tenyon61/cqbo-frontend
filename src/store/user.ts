import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUser } from '@/api/authController.ts'
import { MenuData } from '@/layouts/basic-layout/typing.ts'
import { rootRoute } from '@/router/constant.ts'
import dynamicRoutes from '@/router/dynamic-routes.ts'
import { genRoutes } from '@/router/generate-route.ts'

export const useUserStore = defineStore('user', () => {
  const loginUser = ref<API.LoginUserVO>({
    userName: '游客123',
  })

  /**
   * 远程获取登录用户信息
   */
  async function fetchLoginUser() {
    await getLoginUser().then((res) => {
      if (res.data.code === 0 && res.data.data) {
        loginUser.value = res.data.data
      } else {
        loginUser.value = { userRole: '0' }
      }
    })
  }

  /**
   * 单独设置用户信息
   *
   * @param newLoginUser
   */
  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  const menuData = shallowRef<MenuData>([])
  const routerData = shallowRef()

  const generateRoutes = async () => {
    const currentRoute = {
      ...rootRoute,
      children: dynamicRoutes,
    }
    menuData.value = genRoutes(dynamicRoutes)
    return currentRoute
  }

  const generateDynamicRoutes = async () => {
    const routerDatas = await generateRoutes()
    routerData.value = routerDatas
    return routerDatas
  }

  return {
    loginUser,
    fetchLoginUser,
    setLoginUser,
    menuData,
    routerData,
    generateDynamicRoutes,
  }
})
