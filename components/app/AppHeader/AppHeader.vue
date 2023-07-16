<script setup>
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import { useDevice, useI18n, useLocalePath } from '#imports'

const { isMobile } = useDevice()
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = [
  { label: t('navigation.news'), route: localePath('/') },
  { label: t('navigation.sales'), route: localePath('/') },
  { label: t('navigation.celebrity'), route: localePath('/') },
  { label: t('navigation.diamonds'), route: localePath('/') },
  { label: t('navigation.overdoseColor'), route: localePath('/') },
]
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <n-button
        v-if="isMobile"
        quaternary
        circle
        type="primary"
        size="large"
      >
        <template #icon>
          <n-icon :size="30">
            <bars3-icon />
          </n-icon>
        </template>
      </n-button>
      <img
        src="~/assets/logo-gold.png"
        alt=""
      >
      <div class="header__menu">
        <div v-if="!isMobile" class="header__menu-search">
          <input
            placeholder="O que você procura?"
          >
          <n-button
            class="search-button"
            quaternary
            circle
            type="primary"
            size="large"
          >
            <template #icon>
              <n-icon :size="30">
                <magnifying-glass-icon />
              </n-icon>
            </template>
          </n-button>
        </div>
        <n-button
          v-if="!isMobile"
          quaternary
          circle
          type="primary"
          size="large"
        >
          <template #icon>
            <n-icon :size="30">
              <user-circle-icon />
            </n-icon>
          </template>
        </n-button>
        <n-button
          v-else
          quaternary
          circle
          type="primary"
          size="large"
        >
          <template #icon>
            <n-icon :size="30">
              <magnifying-glass-icon />
            </n-icon>
          </template>
        </n-button>
        <n-button
          quaternary
          circle
          type="primary"
          size="large"
        >
          <template #icon>
            <nuxt-link to="/cart">
              <n-icon :size="30">
                <shopping-cart-icon />
              </n-icon>
            </nuxt-link>
          </template>
        </n-button>
      </div>
    </div>
    <nav v-if="!isMobile" class="header__nav">
      <ul>
        <li v-for="{ label, route } in navLinks" :key="label">
          <NuxtLink :to="route" class="header__nav-link">
            {{ label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import './AppHeader.scss';
</style>
