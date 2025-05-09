<script lang="ts" setup>
  import {
    ClipboardDocumentCheckIcon,
    ClipboardDocumentIcon,
  } from '@heroicons/vue/24/outline'
  import { useI18n } from '#imports'

  defineProps<{ source: string }>()

  const { t } = useI18n()
  const { copy, isSupported, copied } = useClipboard()

  const buttonContent = computed(() =>
    copied.value
      ? t('modalPix.actions.copied')
      : t('modalPix.actions.copyLink'),
  )
</script>
<template>
  <div class="copy-to-clipbord-button">
    <n-button
      v-if="isSupported"
      :type="copied ? 'success' : 'primary'"
      ghost
      @click.prevent="copy(source)"
    >
      {{ buttonContent }}
      <n-icon>
        <ClipboardDocumentCheckIcon v-if="copied" />
        <ClipboardDocumentIcon v-else />
      </n-icon>
    </n-button>
    <p v-else>
      {{ t('modalPix.actions.error.copyToClipbordNotSupported') }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
  button {
    width: 150px;

    .n-icon {
      margin-left: 5px;
    }
  }
</style>

<i18n lang="json">
{
  "pt-br": {
    "actions": {
      "copy-link": "Copiar Link",
      "copied": "Copiado"
    },
    "error": {
      "copy-to-clipbord-not-supported": "Infelizmente seu browser não suporta essa funcionalidade."
    }
  }
}
</i18n>
