<script setup lang="ts">
import { computed } from 'vue'
import { mdiBankOutline, mdiEarth, mdiHelpCircleOutline, mdiOpenInNew } from '@mdi/js'
import { buscarSite, PORTAL_NACIONAL_URL, type Municipio } from '@/services/municipios'

const props = defineProps<{ municipio: Municipio }>()

const site = computed(() => buscarSite(props.municipio.ibge))
const usaPadraoNacional = computed(() => site.value?.url === PORTAL_NACIONAL_URL)

const situacao = computed(() => {
  if (!site.value) {
    return {
      cor: 'warning',
      icone: mdiHelpCircleOutline,
      titulo: 'Ainda sem link cadastrado',
      texto:
        'Não temos o site próprio desta prefeitura. Como os municípios estão migrando para o padrão nacional, tente a consulta pública do Portal Nacional.',
    }
  }
  if (usaPadraoNacional.value) {
    return {
      cor: 'secondary',
      icone: mdiEarth,
      titulo: 'Padrão Nacional',
      texto: 'Esta prefeitura emite NFS-e pelo padrão nacional: a verificação é feita no Portal Nacional.',
    }
  }
  return {
    cor: 'primary',
    icone: mdiBankOutline,
    titulo: 'Site da prefeitura',
    texto: 'A verificação de autenticidade é feita no portal de NFS-e da própria prefeitura.',
  }
})

// a URL do sistema anterior já vira botão, então não precisa aparecer no texto
const observacao = computed(() => {
  const obs = site.value?.observacao
  if (!obs) return ''
  return obs
    .replace(/\s*\(?https?:\/\/\S+\)?/g, '')
    .replace(/\s*\(\s*\)|[\s:;,(]+$/g, '')
    .trim()
})

const verificadoEm = computed(() =>
  site.value ? new Date(`${site.value.verificadoEm}T12:00:00`).toLocaleDateString('pt-BR') : '',
)
</script>

<template>
  <v-card>
    <div class="d-flex align-start ga-4 pa-5 pb-0">
      <v-avatar :color="situacao.cor" variant="tonal" rounded="lg" size="48">
        <v-icon :icon="situacao.icone" />
      </v-avatar>
      <div class="flex-grow-1" style="min-width: 0">
        <div class="text-headline-small font-weight-bold">{{ municipio.nome }} — {{ municipio.uf }}</div>
        <div class="d-flex flex-wrap align-center ga-2 mt-1">
          <v-chip :color="situacao.cor" size="small" variant="tonal">{{ situacao.titulo }}</v-chip>
          <v-chip v-if="site?.provedor && !usaPadraoNacional" size="small" variant="outlined">
            {{ site.provedor }}
          </v-chip>
          <span class="text-body-small text-medium-emphasis">IBGE {{ municipio.ibge }}</span>
        </div>
      </div>
    </div>

    <v-card-text class="pt-4 text-body-medium">
      <p>{{ situacao.texto }}</p>
      <p v-if="observacao" class="mt-2 text-medium-emphasis">{{ observacao }}</p>
      <p v-if="site" class="mt-2 text-body-small text-disabled">Link conferido em {{ verificadoEm }}</p>
    </v-card-text>

    <v-card-actions class="flex-wrap ga-2 px-5 pb-5 pt-0">
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
        :color="site && !usaPadraoNacional ? 'primary' : 'secondary'"
        :variant="site && !usaPadraoNacional ? 'tonal' : 'flat'"
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
