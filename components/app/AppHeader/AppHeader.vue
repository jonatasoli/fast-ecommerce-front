<script lang="ts" setup>
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
    <NavBar v-if="!isMobile" />
  </header>
</template>

<style lang="scss" scoped>
@import './AppHeader.scss';
</style>
