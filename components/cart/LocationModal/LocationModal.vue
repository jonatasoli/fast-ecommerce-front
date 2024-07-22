<template>
  <n-modal v-model:show="show" :closable="false" close-on-esc="false">
    <n-card
      style="width: 600px"
      :title="t('locationModal.title')"
      role="dialog"
    >
      <n-space align="center">
        <p>{{ t('locationModal.description') }}:</p>
        <n-radio
          :checked="location === Locations[Locations.BR]"
          :value="Locations[Locations.BR]"
          name="location"
          @change="handleChange"
        >
          {{ t('locationModal.values.br') }}
        </n-radio>
        <n-radio
          :checked="location === Locations[Locations.EU]"
          :value="Locations[Locations.EU]"
          name="location"
          @change="handleChange"
        >
          {{ t('locationModal.values.eu') }}
        </n-radio>
      </n-space>

      <n-space justify="center" style="margin-top: 20px">
        <n-button
          :disabled="!location"
          type="primary"
          @click.prevent="show = false"
        >
          {{ t('locationModal.actions.confirm') }}
        </n-button>
      </n-space>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
  import { useLocation, Locations } from '~/composables/useLocation'

  const props = defineProps<{ show: boolean }>()
  const show = useVModel(props, 'show')
  const { t } = useI18n()

  const { location, setLocation } = useLocation()

  function handleChange(event: Event) {
    setLocation((event.target as HTMLInputElement).value)
  }
</script>

<i18n lang="json">
{
  "pt": {
    "locationModal": {
      "title": "Localidade",
      "description": "Por favor, informe sua localidade",
      "values": {
        "br": "Brasil",
        "eu": "Europa"
      },
      "actions": {
        "confirm": "Confirmar"
      }
    }
  },
  "en": {
    "locationModal": {
      "title": "Location",
      "description": "Please, select your location",
      "values": {
        "br": "Brazil",
        "eu": "Europe"
      },
      "actions": {
        "confirm": "Done"
      }
    }
  }
}
</i18n>
