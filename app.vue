<script setup lang="ts">
import { useNuxtApp, onBeforeMount } from "#imports";
import { useUserStore } from "@/stores/user";
import { useCategoryStore } from "@/stores/categories";

const nuxtApp = useNuxtApp();

const storeUser = useUserStore();
const storeCategory = useCategoryStore();
const cartStore = useCartStore();
const route = useRoute();
const affiliate: string = (route.query.affiliate as string) ;

onBeforeMount(async () => {
  await storeCategory.getCategorys();
  await storeUser.getUser();
  await nuxtApp.$router.isReady();
  if (affiliate) {
    await cartStore.setAffiliate(affiliate);
  }
});

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
