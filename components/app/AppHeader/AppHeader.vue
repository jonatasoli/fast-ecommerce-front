<script lang="ts" setup>
  import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
  } from '@heroicons/vue/24/outline'
  import {
    NavBar,
    SideNav,
    UserMenu,
    UserMenuMobile,
  } from '~/components/header'
  import { ref, useDevice, useRouter } from '#imports'

  const { isMobile } = useDevice()
  const router = useRouter()
  const search = ref('')
  const config = useRuntimeConfig()
  const Logo = config.public.urlLogo
  const AltLogo = config.public.urlAltLogo

  function doSearch() {
    const trimSearch = search.value.trim()

    if (!trimSearch) {
      return
    }

    const encodedSearch = encodeURIComponent(trimSearch)
    router.push(`/search?q=${encodedSearch}`)
    search.value = ''
  }

  onMounted(async () => {
    await useCategoryStore().getCategorys()
  })
</script>

<template>
  <header class="header">
    <div class="header__top">
      <SideNav v-if="isMobile" />
      <NuxtLink to="/" class="logo">
        <img :src="Logo" :alt="AltLogo" />
      </NuxtLink>
      <div v-if="!isMobile" class="search-bar">
        <div class="search-bar__group">
          <!-- FIXME: i18n -->
          <input
            v-model="search"
            type="text"
            placeholder="Digite o que você procura"
            @keyup.enter="doSearch"
          />
          <button @click="doSearch">
            <n-icon>
              <MagnifyingGlassIcon />
            </n-icon>
          </button>
        </div>
      </div>
      <div class="menu">
        <UserMenuMobile v-if="isMobile" />
        <UserMenu v-else />
      </div>
      <n-button quaternary circle type="primary" size="large">
        <template #icon>
          <nuxt-link to="/cart">
            <n-icon :size="30">
              <ShoppingCartIcon />
            </n-icon>
          </nuxt-link>
        </template>
      </n-button>
    </div>

    <NavBar v-if="!isMobile" />
  </header>
</template>

<style lang="scss" scoped>
  @use './AppHeader.scss';
</style>
