<script lang="ts" setup>
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import { CATEGORIES, useDevice, useI18n, useLocalePath } from '#imports'

const { isMobile } = useDevice()
const { t } = useI18n()
const localePath = useLocalePath()

const categoryRoute = (uri: CATEGORIES): string => localePath({ name: 'category', params: { categoryUri: uri } })

const nav = [
  {
    label: t('navigation.news'),
    children: [],
    route: categoryRoute(CATEGORIES.NEWS),
  },
  {
    label: t('navigation.categories'),
    route: localePath({ name: 'category' }),
    children: [
      {
        label: t('navigation.celebrity'),
        route: categoryRoute(CATEGORIES.CELEBRITY),
      },
      {
        label: t('navigation.diammontLiss'),
        route: categoryRoute(CATEGORIES.DIAMMONT_LISS),
      },
      {
        label: t('navigation.hairSpray'),
        route: categoryRoute(CATEGORIES.HAIR_SPRAY),
      },
      {
        label: t('navigation.helpTherapy'),
        route: categoryRoute(CATEGORIES.HELP_THERAPY),
      },
      {
        label: t('navigation.shower'),
        route: categoryRoute(CATEGORIES.SHOWER),
      },
      {
        label: t('navigation.overdoseColor'),
        route: categoryRoute(CATEGORIES.OVERDOSE_COLOR),
      },
      {
        label: t('navigation.vibranceCurls'),
        route: categoryRoute(CATEGORIES.VIBRANCE_CURLS),
      },
      {
        label: t('navigation.wonderLiss'),
        route: categoryRoute(CATEGORIES.WONDER_LISS),
      },
    ],
  },
  {
    label: t('navigation.kits'),
    children: [],
    route: categoryRoute(CATEGORIES.KITS),
  },
  {
    label: t('navigation.naturalCompound'),
    children: [],
    route: categoryRoute(CATEGORIES.NATURAL_COMPOUND),
  },
  {
    label: t('navigation.accessories'),
    route: categoryRoute(CATEGORIES.ACCESSORIES),
    children: [
      {
        label: t('navigation.trainningDoll'),
        route: categoryRoute(CATEGORIES.TRAINING_DOLL),
      },
      {
        label: t('navigation.books'),
        route: categoryRoute(CATEGORIES.BOOKS),
      },
      {
        label: t('navigation.scissors'),
        route: categoryRoute(CATEGORIES.SCISSORS),
      },
    ],
  },
  {
    label: t('navigation.sales'),
    children: [],
    route: categoryRoute(CATEGORIES.SALE),
  },
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
        <li v-for="{ label, route } in nav" :key="label">
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
