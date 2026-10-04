<script setup lang="ts">
import { computed } from 'vue'
import { mdiAlertCircleOutline, mdiCheckDecagram, mdiOpenInNew } from '@mdi/js'
import { buscarSite, PORTAL_NACIONAL_URL, type Municipio } from '@/services/municipios'

const props = defineProps<{ municipio: Municipio }>()

const site = computed(() => buscarSite(props.municipio.ibge))
const usaPadraoNacional = computed(() => site.value?.url === PORTAL_NACIONAL_URL)

const verificadoEm = computed(() =>
  site.value ? new Date(`${site.value.verificadoEm}T12:00:00`).toLocaleDateString('pt-BR') : '',
)
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>{{ municipio.nome }} — {{ municipio.uf }}</v-card-title>
      <v-card-subtitle>Código IBGE {{ municipio.ibge }}</v-card-subtitle>
    </v-card-item>

    <v-card-text v-if="site">
      <v-alert type="success" variant="tonal" :icon="mdiCheckDecagram" class="mb-3">
        <template v-if="usaPadraoNacional">
          Esta prefeitura emite NFS-e pelo padrão nacional: a verificação é feita no Portal Nacional.
        </template>
        <template v-else>Temos o site de verificação de NFS-e desta prefeitura.</template>
      </v-alert>
      <div v-if="site.provedor"><strong>Sistema:</strong> {{ site.provedor }}</div>
      <div v-if="site.observacao">{{ site.observacao }}</div>
      <div class="text-medium-emphasis text-body-small mt-1">Link conferido em {{ verificadoEm }}</div>
    </v-card-text>

    <v-card-text v-else>
      <v-alert type="info" variant="tonal" :icon="mdiAlertCircleOutline">
        Ainda não temos o site próprio desta prefeitura. Os municípios estão migrando para o padrão
        nacional da NFS-e, então tente a consulta pública do Portal Nacional.
      </v-alert>
    </v-card-text>

    <v-card-actions class="flex-wrap ga-2 px-4 pb-4">
      <v-btn
        v-if="site && !usaPadraoNacional"
        :href="site.url"
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        variant="flat"
        :append-icon="mdiOpenInNew"
      >
        Abrir site da prefeitura
      </v-btn>
      <v-btn
        :href="PORTAL_NACIONAL_URL"
        target="_blank"
        rel="noopener noreferrer"
        :variant="site && !usaPadraoNacional ? 'outlined' : 'flat'"
        color="primary"
        :append-icon="mdiOpenInNew"
      >
        Portal Nacional da NFS-e
      </v-btn>
      <v-btn
        v-if="site?.urlAnterior"
        :href="site.urlAnterior"
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        :append-icon="mdiOpenInNew"
      >
        Sistema anterior (notas antigas)
      </v-btn>
      <v-btn v-if="!site" to="/contribuir" variant="text">Sugerir link</v-btn>
    </v-card-actions>
  </v-card>
</template>
