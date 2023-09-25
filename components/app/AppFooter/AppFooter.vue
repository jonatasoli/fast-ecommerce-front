<script setup lang="ts">
import { useI18n } from '#imports'
import { useNavLinks } from '~/components/header/nav-links'

const { t } = useI18n()
const { navLinks } = useNavLinks()
</script>

<template>
  <footer>
    <div class="footer">
      <div class="footer__wrapper container">
        <div class="footer__categories">
          <p>{{ t('navigation.categories') }}</p>
          <ul>
            <li v-for="link in navLinks" :key="link.key">
              <NuxtLink :to="link.to">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer__address">
        <address class="container">
          {{ t('address') }}
        </address>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import './AppFooter.scss';
</style>
