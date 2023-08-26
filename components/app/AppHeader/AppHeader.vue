<script lang="ts" setup>
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import { CATEGORIES, onClickOutside, ref, useDevice, useI18n, useLocalePath } from '#imports'

const { isMobile } = useDevice()
const { t } = useI18n()
const localePath = useLocalePath()
const open = ref(false)
const nav = ref<HTMLElement | null>(null)

const categoryLink = (uri: CATEGORIES | '', label: string, basePath = 'categories') => ({
  label,
  to: localePath(`/${basePath}${uri ? `/${uri}` : ''}`),
  key: uri || basePath,
  children: [],
})

const navLinks = [
  categoryLink(CATEGORIES.NEWS, t('navigation.news')),
  {
    ...categoryLink('', t('navigation.categories'), 'categories'),
    children: [
      categoryLink(CATEGORIES.CELEBRITY, t('navigation.celebrity')),
      categoryLink(CATEGORIES.DIAMMONT_LISS, t('navigation.diammontLiss')),
      categoryLink(CATEGORIES.HAIR_SPRAY, t('navigation.hairSpray')),
      categoryLink(CATEGORIES.HELP_THERAPY, t('navigation.helpTherapy')),
      categoryLink(CATEGORIES.OVERDOSE_COLOR, t('navigation.overdoseColor')),
      categoryLink(CATEGORIES.VIBRANCE_CURLS, t('navigation.vibranceCurls')),
      categoryLink(CATEGORIES.WONDER_LISS, t('navigation.wonderLiss')),
    ],
  },
  categoryLink(CATEGORIES.SHOWER, t('navigation.shower')),
  categoryLink(CATEGORIES.KITS, t('navigation.kits')),
  categoryLink(CATEGORIES.NATURAL_COMPOUND, t('navigation.naturalCompound')),
  {
    ...categoryLink('', t('navigation.accessories'), 'accessories'),
    children: [
      categoryLink(CATEGORIES.TRAINING_DOLL, t('navigation.trainningDoll'), 'accessories'),
      categoryLink(CATEGORIES.BOOKS, t('navigation.books'), 'accessories'),
      categoryLink(CATEGORIES.SCISSORS, t('navigation.scissors'), 'accessories'),
    ],
  },
  categoryLink('', t('navigation.sales'), 'sales'),
]

function topggleSidenav() {
  open.value = !open.value
}

function closeSidenav() {
  open.value = false
}

onClickOutside(nav, () => {
  if (window.innerWidth < 768) {
    closeSidenav()
  }
})
</script>

<template>
  <header class="header">
    <div class="header__top">
      <n-button
        text
        class="sidenav-btn"
        @click="topggleSidenav"
      >
        <n-icon :size="30">
          <bars3-icon />
        </n-icon>
      </n-button>
      <NuxtLink to="/" class="logo">
        <img src="~/assets/logo-gold.png" alt="Gatto Rosa">
      </NuxtLink>
      <div class="search-bar" />
      <div class="menu" />
    </div>
    <div v-if="false" class="header__logo">
      <div class="header__menu-btn">
        <n-button text class="sidenav-btn">
          <n-icon :size="30">
            <bars3-icon />
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
    <nav class="header__nav" :class="{ '--open': open }">
      <ul ref="nav" class="nav">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="link.to"
            class="nav-link"
            @click="closeSidenav"
          >
            {{ link.label }}
          </NuxtLink>
          <div class="dropdown">
            <ul v-if="link.children.length > 0">
              <li v-for="sublink in link.children" :key="sublink.key">
                <NuxtLink
                  :to="sublink.to"
                  class="nav-link dropdown-link"
                  @click="closeSidenav"
                >
                  {{ sublink.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import './AppHeader.scss';
</style>
