<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import { useI18n } from '#imports'

  const props = defineProps({
    isOpen: {
      type: Boolean,
      required: true,
    },
  })

  const emit = defineEmits(['close'])
  const { t } = useI18n()

  const closeModal = () => {
    emit('close')
  }
</script>
<template>
  <div v-if="props.isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2 class="modal-title">{{ t('terms.importantAlert') }}</h2>
      <p class="modal-body">
        <strong>{{ t('terms.termsOfUse') }}</strong
        ><br />
        {{ t('terms.exclusiveUse') }}<br />
        {{ t('terms.useGlovesToProcedure') }}<br />
        {{ t('terms.notApplySkin') }}<br />
        {{ t('terms.doTestBeforeUse') }}<br />
        {{ t('terms.notAdviseHouseHoldUse') }}<br />
        <em>{{ t('terms.buyPurchasing') }}</em>
      </p>
      <button class="close-modal-btn" @click="closeModal">
        {{ t('terms.close') }}
      </button>
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
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    margin: 0 10px;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .modal-body {
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: left;
  }

  .close-modal-btn,
  .open-modal-btn {
    margin-top: 15px;
    background: #da9a39;
    color: #ffffff;
    border: none;
    padding: 10px 15px;
    font-size: 0.9rem;
    cursor: pointer;
    border-radius: 5px;
  }

  .close-modal-btn:hover,
  .open-modal-btn:hover {
    background: #e4a647;
  }
</style>
