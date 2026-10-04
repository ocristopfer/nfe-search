<script setup lang="ts">
import { mdiGithub, mdiPlus } from '@mdi/js'

const repositorio = 'https://github.com/ocristopfer/nfe-search'
const corpoIssue = [
  'Município:',
  'UF:',
  'Link da verificação de autenticidade:',
  'Sistema/provedor (se souber):',
].join('\n')
const novaIssue =
  `${repositorio}/issues/new` +
  `?title=${encodeURIComponent('Novo link: <cidade> - <UF>')}` +
  `&body=${encodeURIComponent(corpoIssue)}`
</script>

<template>
  <h1 class="text-headline-medium mb-4">Contribuir</h1>
  <v-card class="mb-4">
    <v-card-title>Sugerir o link de uma cidade</v-card-title>
    <v-card-text>
      Abra uma issue no GitHub com o nome do município, a UF e o link da página de verificação de
      autenticidade da NFS-e. Links quebrados também podem ser reportados por lá.
    </v-card-text>
    <v-card-actions class="px-4 pb-4">
      <v-btn
        :href="novaIssue"
        target="_blank"
        rel="noopener"
        color="primary"
        variant="flat"
        :prepend-icon="mdiPlus"
      >
        Sugerir link
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card>
    <v-card-title>Editar diretamente</v-card-title>
    <v-card-text>
      Os links ficam em <code>src/data/sites.json</code>, identificados pelo código IBGE do
      município (veja <code>src/data/municipios.json</code>). Basta adicionar uma entrada e abrir um
      pull request.
    </v-card-text>
    <v-card-actions class="px-4 pb-4">
      <v-btn :href="repositorio" target="_blank" rel="noopener" variant="outlined" :prepend-icon="mdiGithub">
        Ver repositório
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
