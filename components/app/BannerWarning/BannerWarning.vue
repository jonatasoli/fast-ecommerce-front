<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
  })

  const emit = defineEmits(['close'])

  const closeModal = () => {
    emit('close')
  }
</script>

<template>
  <div v-if="props.isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <img src="/assets/images/site.png" alt="Imagem" class="modal-image" />
      <button class="close-modal-btn" @click="closeModal">OK</button>
    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: #ffffff;
    padding: 15px;
    border-radius: 8px;
    width: 90%;
    max-width: 320px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .modal-image {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .close-modal-btn {
    margin-top: 15px;
    background: #da9a39;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 5px;
  }

  .close-modal-btn:hover {
    background: #e4a647;
  }

  @media (min-width: 768px) {
    .modal-content {
      max-width: 500px;
      padding: 20px;
    }

    .modal-image {
      height: auto;
    }
  }
</style>
