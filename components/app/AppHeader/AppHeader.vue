<script lang="ts" setup>
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from '@heroicons/vue/24/outline'
import { NavBar, SideNav, UserMenu, UserMenuMobile } from '~/components/header'
import { useDevice } from '#imports'

const { isMobile } = useDevice()
</script>

<template>
  <header class="header">
    <div class="header__top">
      <SideNav v-if="isMobile" />
      <NuxtLink to="/" class="logo">
        <img src="~/assets/logo-gold.png" alt="Gatto Rosa">
      </NuxtLink>
      <div class="search-bar" />
      <div class="menu">
        <UserMenuMobile v-if="isMobile" />
        <UserMenu v-else />
      </div>
    </div>
    <div v-if="false" class="header__logo">
      <div class="header__menu-btn">
        <n-button text class="sidenav-btn">
          <n-icon :size="30">
            <Bars3Icon />
          </n-icon>
        </n-button>
      </div>
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
                <MagnifyingGlassIcon />
              </n-icon>
            </template>
          </n-button>
        </div>
        <n-button
          v-else
          quaternary
          circle
          type="primary"
          size="large"
        >
          <template #icon>
            <n-icon :size="30">
              <MagnifyingGlassIcon />
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
                <ShoppingCartIcon />
              </n-icon>
            </nuxt-link>
          </template>
        </n-button>
      </div>
    </div>
    <NavBar v-if="!isMobile" />
  </header>
</template>

<style lang="scss" scoped>
@import './AppHeader.scss';
</style>
