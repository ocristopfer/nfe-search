<script setup lang="ts">
import { computed, ref } from 'vue'
import { mdiMagnify } from '@mdi/js'
import MunicipioResultado from '@/components/MunicipioResultado.vue'
import {
  buscarMunicipio,
  municipios,
  municipiosComSite,
  normalizar,
  rotuloMunicipio,
  ufs,
} from '@/services/municipios'

const uf = ref<string | null>(null)
const ibgeSelecionado = ref<string | null>(null)

const itens = computed(() =>
  municipios
    .filter((m) => !uf.value || m.uf === uf.value)
    .map((m) => ({ title: rotuloMunicipio(m), value: m.ibge })),
)

const selecionado = computed(() =>
  ibgeSelecionado.value ? buscarMunicipio(ibgeSelecionado.value) : undefined,
)

// Filtro sem acentos: "sao joao" encontra "São João". Devolve a posição para o destaque do Vuetify.
function filtroSemAcento(valor: string, busca: string): number | false {
  const posicao = normalizar(valor).indexOf(normalizar(busca.trim()))
  return posicao === -1 ? false : posicao
}

function aoTrocarUf() {
  if (selecionado.value && uf.value && selecionado.value.uf !== uf.value) {
    ibgeSelecionado.value = null
  }
}
</script>

<template>
  <h1 class="text-headline-medium mb-2">Verifique uma NFS-e</h1>
  <p class="text-medium-emphasis mb-6">
    Escolha o município que emitiu a nota fiscal de serviço para ir direto ao site de verificação de
    autenticidade da prefeitura.
  </p>

  <v-card class="mb-6">
    <v-card-text>
      <v-row dense>
        <v-col cols="12" sm="3">
          <v-select
            v-model="uf"
            :items="ufs"
            label="UF"
            clearable
            hide-details
            @update:model-value="aoTrocarUf"
          />
        </v-col>
        <v-col cols="12" sm="9">
          <v-autocomplete
            v-model="ibgeSelecionado"
            :items="itens"
            :custom-filter="filtroSemAcento"
            :prepend-inner-icon="mdiMagnify"
            label="Município"
            placeholder="Digite o nome da cidade"
            no-data-text="Nenhum município encontrado"
            clearable
            auto-select-first
            hide-details
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <MunicipioResultado v-if="selecionado" :municipio="selecionado" class="mb-6" />

  <v-card variant="tonal">
    <v-card-title class="text-title-medium">Municípios com link cadastrado</v-card-title>
    <v-card-subtitle>
      {{ municipiosComSite.length }} de {{ municipios.length }} municípios
    </v-card-subtitle>
    <v-card-text>
      <v-chip-group column>
        <v-chip v-for="m in municipiosComSite" :key="m.ibge" @click="ibgeSelecionado = m.ibge">
          {{ rotuloMunicipio(m) }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>
