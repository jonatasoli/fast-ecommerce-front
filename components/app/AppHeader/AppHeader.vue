<script lang="ts" setup>
  import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
  } from '@heroicons/vue/24/outline'
  import FlagIcon from 'vue3-flag-icons'
  import {
    NavBar,
    SideNav,
    UserMenu,
    UserMenuMobile,
  } from '~/components/header'
  import { ref, useDevice, useRouter, useI18n } from '#imports'
  import { supportedFlags } from '~/composables/useLocale'
  const { locale, setLocale } = useLocale()

  const { isMobile } = useDevice()
  const router = useRouter()
  const search = $ref('')
  const config = useRuntimeConfig()
  const { t } = useI18n()
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

  const flagLabels: Record<SupportedFlag, string> = {
    br: 'Português (Brasil)',
    us: 'English (US)',
    es: 'Español (ES)',
    pt: 'Português (Portugal)',
  }

  const dropdownOptions = supportedFlags.map((flag) => ({
    label: flagLabels[flag],
    key: flag,
    icon: () => h(FlagIcon, { code: flag, size: 20 }),
  }))

  function handleSelect(flag: string) {
    setLocale(flag as SupportedFlag)
    location.reload()
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
          <input
            v-model="search"
            type="text"
            :placeholder="t('userMenu.placeholder')"
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
      <div>
        <n-dropdown
          trigger="click"
          :options="dropdownOptions"
          @select="handleSelect"
        >
          <n-button text>
            <FlagIcon :code="locale" size="24" />
          </n-button>
        </n-dropdown>
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
