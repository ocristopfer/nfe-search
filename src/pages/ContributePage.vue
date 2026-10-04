<script setup lang="ts">
import { mdiCodeJson, mdiGithub, mdiMessagePlusOutline, mdiPlus } from '@mdi/js'

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
  <div class="mx-auto" style="max-width: 820px">
    <h1 class="text-headline-large font-weight-bold mb-2">Contribuir</h1>
    <p class="text-body-large text-medium-emphasis mb-8">
      A base cresce com a ajuda de quem usa. Encontrou um link quebrado ou conhece o site de uma cidade
      que ainda não está aqui? Conte para a gente.
    </p>

    <v-card class="pa-5 mb-4">
      <div class="d-flex ga-4">
        <v-avatar color="primary" variant="tonal" rounded="lg" size="44">
          <v-icon :icon="mdiMessagePlusOutline" />
        </v-avatar>
        <div>
          <h2 class="text-title-large font-weight-bold mt-0 mb-1">Sugerir o link de uma cidade</h2>
          <p class="text-body-medium text-medium-emphasis mb-4">
            Abra uma issue no GitHub com o nome do município, a UF e o link da página de verificação
            de autenticidade da NFS-e. Links quebrados também podem ser reportados por lá.
          </p>
          <v-btn :href="novaIssue" target="_blank" rel="noopener" color="primary" variant="flat" :prepend-icon="mdiPlus">
            Sugerir link
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-card class="pa-5">
      <div class="d-flex ga-4">
        <v-avatar color="secondary" variant="tonal" rounded="lg" size="44">
          <v-icon :icon="mdiCodeJson" />
        </v-avatar>
        <div>
          <h2 class="text-title-large font-weight-bold mt-0 mb-1">Editar diretamente</h2>
          <p class="text-body-medium text-medium-emphasis mb-4">
            Os links ficam em <code>src/data/sites.json</code>, identificados pelo código IBGE do
            município (veja <code>src/data/municipios.json</code>). Basta adicionar uma entrada e abrir
            um pull request.
          </p>
          <v-btn :href="repositorio" target="_blank" rel="noopener" variant="tonal" :prepend-icon="mdiGithub">
            Ver repositório
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
