<template>
  <div class="whatsapp-button" @click="contactWhatsApp">
    <img src="../../assets//images//icons8-whatsapp.svg" alt="" />
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { useNuxtApp } from '#app'

  const props = defineProps<{
    message?: string
    buttonText?: string
  }>()

  const { $whatsapp } = useNuxtApp()

  const contactWhatsApp = () => {
    const whatsappMessage =
      props.message || 'Olá, gostaria de saber mais informações.'
    $whatsapp(whatsappMessage)
  }
</script>

<style scoped lang="scss">
  .whatsapp-button {
    font-weight: bold;
    border: none;
    cursor: pointer;
    position: fixed;
    bottom: 10px;
    right: 20px;

    border-radius: 50%;
    padding: 10px;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 50px;
      height: 50px;
    }
  }
</style>
