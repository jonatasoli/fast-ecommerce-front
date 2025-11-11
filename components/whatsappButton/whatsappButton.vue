<template>
  <div></div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js'

  onMounted(() => {
    Typebot.initBubble({
      typebot: 'my-typebot-18eihra',
      apiHost: 'https://bot.hairschoolacademy.com',
      previewMessage: {
        message: 'Tem alguma dúvida? Entre em contato conosco.',
      },
      theme: {
        button: { backgroundColor: '#598E71', size: 'large' },
        chatWindow: { backgroundColor: '#fff' },
      },
    })
  })
</script>
