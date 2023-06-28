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
  <header class="bg-black fixed top-0 w-full">
    <div class="grid grid-cols-3 p-2 md:w-4/5 mx-auto">
      <button v-if="isMobile" class="col-start-1 text-gattoRosa-primary">
        <bars3-icon class="w-6 h-6" />
      </button>
      <img
        class="col-start-2 col-end-3 justify-self-center self-center"
        width="250"
        src="~/assets/logo-gold.png"
        alt=""
      >
      <div class="flex items-center justify-end gap-2 md:gap-8 text-gattoRosa-primary">
        <div v-if="!isMobile" class="relative">
          <input
            class="bg-transparent text-white border-b-2 first-letter border-b-gattoRosa-primary h-10 w-full"
            placeholder="O que você procura?"
          >
          <button class="text-gattoRosa-primary absolute top-0 right-0 z-10 h-full">
            <magnifying-glass-icon class="w-6 h-6" />
          </button>
        </div>
        <button v-if="!isMobile">
          <user-circle-icon class="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button v-else>
          <magnifying-glass-icon class="w-6 h-6" />
        </button>
        <button>
          <shopping-cart-icon class="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>
    </div>
    <nav v-if="!isMobile" class="bg-gattoRosa-primary font-semibold px-4">
      <ul class="flex justify-center gap-8 md:w-4/5 mx-auto">
        <li v-for="{ label, route } in navLinks" :key="label">
          <NuxtLink :to="route" class="text-black inline-flex leading-4 text-sm px-4 h-[42px] items-center transition bg-transparent hover:opacity-50">
            {{ label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
