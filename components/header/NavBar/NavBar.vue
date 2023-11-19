<script setup lang="ts">
import { useNavLinks } from '../nav-links'

const { categories } = storeToRefs(useCategoryStore())
const { navLinks } = useNavLinks(categories)

watch(categories, () => {
  navLinks.value = useNavLinks(categories).navLinks
})
</script>

<template>
  <nav>
    <ul class="nav">
      <li v-for="link in navLinks" :key="link.key">
        <NuxtLink
          :to="link.to"
          class="nav-link"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="dropdown">
          <ul v-if="link.children.length > 0">
            <li v-for="sublink in link.children" :key="sublink.key">
              <NuxtLink
                :to="sublink.to"
                class="nav-link dropdown-link"
              >
                {{ sublink.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import './NavBar.scss';
</style>
