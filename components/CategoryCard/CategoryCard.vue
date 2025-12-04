<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    item: {
      label: string
      uri: string
      image: string
    }
  }>()

  // Computed para garantir a URL da imagem
  const imageUrl = computed(() => {
    return (
      props.item.image || 'https://via.placeholder.com/800x1000?text=Sem+Imagem'
    )
  })

  // Computed para o Link
  const linkTo = computed(() => {
    const uri = props.item.uri || '#'
    return uri.startsWith('/') ? uri : `/categories/${uri}`
  })
</script>

<template>
  <NuxtLink :to="linkTo" class="feature-card">
    <div class="feature-card__media">
      <img
        :src="imageUrl"
        :alt="item.label"
        width="800"
        height="1000"
        class="feature-card__image"
      />
    </div>

    <div class="feature-card__content">
      <h3 class="feature-card__title">
        {{ item.label }}
      </h3>
    </div>
  </NuxtLink>
</template>

<style scoped>
  .feature-card {
    position: relative;
    display: block;
    width: 100%;

    /* --- AQUI ESTÁ A MÁGICA --- */
    /* Define a proporção exata baseada em 800x1000 */
    aspect-ratio: 800 / 1000;
    /* -------------------------- */

    overflow: hidden;
    text-decoration: none;
    background-color: #101010;
  }

  .feature-card__media {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .feature-card__media::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0) 60%
    );
    transition: opacity 0.3s ease;
  }

  .feature-card__image {
    width: 100%;
    height: 100%;
    /* Garante que a imagem preencha os 800x1000 sem esticar/deformar */
    object-fit: cover;
    /* Se quiser garantir que a imagem não pixelize em telas gigantes: */
    /* object-position: center top; */
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .feature-card__content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem;
    box-sizing: border-box;
    z-index: 10;
    text-align: center;
  }

  .feature-card__title {
    font-family: 'Montserrat', sans-serif;
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
    transition: color 0.3s ease;
  }

  /* Hover */
  .feature-card:hover .feature-card__image {
    transform: scale(1.08);
  }

  .feature-card:hover .feature-card__title {
    color: #da9a39;
  }
</style>
