<script setup lang="ts">
import { mdiDatabaseOutline, mdiEarth, mdiMagnify } from '@mdi/js'
import { PORTAL_NACIONAL_URL } from '@/services/municipios'

const pontos = [
  {
    icone: mdiMagnify,
    cor: 'primary',
    titulo: 'O problema',
    texto:
      'Cada prefeitura do Brasil tem (ou tinha) seu próprio sistema de Nota Fiscal de Serviço Eletrônica, e achar a página de verificação de uma nota costuma ser uma busca demorada.',
  },
  {
    icone: mdiDatabaseOutline,
    cor: 'secondary',
    titulo: 'De onde vêm os dados',
    texto:
      'A lista de municípios vem do IBGE. Os links foram levantados nos sites das prefeituras e, para as cidades menores, a partir do provedor de cada município segundo o cadastro do projeto ACBr. Eles são conferidos periodicamente.',
  },
  {
    icone: mdiEarth,
    cor: 'info',
    titulo: 'Padrão Nacional',
    texto:
      'Desde 2026 os municípios estão migrando para o padrão nacional da NFS-e. Para eles, e para quem ainda não tem link cadastrado, indicamos a consulta pública do Portal Nacional.',
  },
]
</script>

<template>
  <div class="mx-auto" style="max-width: 820px">
    <h1 class="text-headline-large font-weight-bold mb-2">Sobre</h1>
    <p class="text-body-large text-medium-emphasis mb-8">
      O <strong>NFS-e Brasil</strong> reúne em um só lugar os sites de verificação de autenticidade de
      NFS-e das prefeituras brasileiras.
    </p>

    <v-card v-for="ponto in pontos" :key="ponto.titulo" class="pa-5 mb-4">
      <div class="d-flex ga-4">
        <v-avatar :color="ponto.cor" variant="tonal" rounded="lg" size="44">
          <v-icon :icon="ponto.icone" />
        </v-avatar>
        <div>
          <h2 class="text-title-large font-weight-bold mt-0 mb-1">{{ ponto.titulo }}</h2>
          <p class="text-body-medium text-medium-emphasis">{{ ponto.texto }}</p>
        </div>
      </div>
    </v-card>

    <div class="d-flex flex-wrap ga-2 mt-6">
      <v-btn :href="PORTAL_NACIONAL_URL" target="_blank" rel="noopener noreferrer" color="secondary" variant="tonal">
        Portal Nacional da NFS-e
      </v-btn>
      <v-btn href="https://projetoacbr.com.br/" target="_blank" rel="noopener" variant="text">Projeto ACBr</v-btn>
      <v-btn to="/contribuir" color="primary" variant="flat">Ajude a completar a lista</v-btn>
    </div>
  </div>
</template>
