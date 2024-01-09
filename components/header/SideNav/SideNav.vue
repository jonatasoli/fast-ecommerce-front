<script setup lang="ts">
  import { Bars3Icon } from '@heroicons/vue/24/outline'
  import { useNavLinks } from '../nav-links'
  import { ref } from '#imports'
  const show = ref(false)

  const store = useCategoryStore()
  const { data } = await useAsyncData(() => store.getCategorys())
  const responseData = unref(data) as {
    categories: CategoryItem[]
  }
  const { navLinks } = useNavLinks(responseData.categories)

  const closeSidenav = () => {
    show.value = false
  }
</script>

<template>
  <n-button text class="sidenav__toggle-btn" @click="show = true">
    <n-icon :size="30">
      <Bars3Icon />
    </n-icon>
  </n-button>
  <n-drawer v-model:show="show" placement="left" width="80%">
    <n-drawer-content body-content-style="padding: 0;">
      <nav>
        <ul class="sidenav__menu">
          <li v-for="link in navLinks" :key="link.key">
            <NuxtLink :to="link.to" class="menu-link" @click="closeSidenav">
              {{ link.label }}
            </NuxtLink>
            <ul
              v-if="link.children && link.children.length > 0"
              class="sidenav__submenu"
            >
              <li v-for="sublink in link.children" :key="sublink.key">
                <NuxtLink
                  :to="sublink.to"
                  class="menu-link submenu-link"
                  @click="closeSidenav"
                >
                  {{ sublink.label }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss">
  @import './SideNav.scss';
</style>
