<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import type { Carousel } from '~/types/products'

  const props = defineProps<{
    carousel: Carousel[]
  }>()

  const currentIndex = ref(0)
  let intervalId: ReturnType<typeof setInterval> | null = null

  function nextBanner() {
    if (!props.carousel.length) {
      return
    }
    currentIndex.value = (currentIndex.value + 1) % props.carousel.length
  }

  function prevBanner() {
    if (!props.carousel.length) {
      return
    }
    currentIndex.value =
      (currentIndex.value - 1 + props.carousel.length) % props.carousel.length
  }

  onMounted(() => {
    intervalId = setInterval(nextBanner, 4000)
  })
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })
</script>

<template>
  <div class="banner-carousel">
    <div
      class="banner-wrapper"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div v-for="item in carousel" :key="item.media_id" class="banner-card">
        <img :src="item.uri" :alt="item.type" />
      </div>
    </div>

    <button class="nav prev" @click="prevBanner">‹</button>
    <button class="nav next" @click="nextBanner">›</button>

    <div class="dots">
      <span
        v-for="(item, index) in carousel"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="currentIndex = index"
      />
    </div>
  </div>
</template>

<style scoped>
  .banner-carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: #f7f7f7;
    max-height: 720px;
  }

  .banner-wrapper {
    display: flex;
    transition: transform 0.6s ease-in-out;
    height: 100%;
  }

  .banner-card {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .banner-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.3);
    border: none;
    color: white;
    font-size: 2rem;
    line-height: 1;
    padding: 0.4rem 0.8rem;
    border-radius: 30%;
    cursor: pointer;
    z-index: 5;
    transition: background 0.2s ease;
  }

  .nav:hover {
    background: rgba(0, 0, 0, 0.5);
  }

  .nav.prev {
    left: 0.8rem;
  }
  .nav.next {
    right: 0.8rem;
  }

  .dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 6;
  }

  .dots span {
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .dots span.active {
    background: white;
  }

  @media (max-width: 768px) {
    .banner-carousel {
      aspect-ratio: 16 / 9;
      max-height: 300px;
    }

    .nav {
      font-size: 1.5rem;
      padding: 0.3rem 0.6rem;
    }

    .dots span {
      width: 8px;
      height: 8px;
    }
  }

  @media (min-width: 769px) and (max-width: 1199px) {
    .banner-carousel {
      max-height: 450px;
    }
  }

  @media (min-width: 1800px) {
    .banner-carousel {
      max-height: 1080px;
    }
  }
</style>
