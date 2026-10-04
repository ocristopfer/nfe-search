<script setup lang="ts">
import { useTheme } from 'vuetify'
import { mdiFileCheckOutline, mdiGithub, mdiMenu, mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js'
import { TEMA_STORAGE_KEY } from '@/plugins/vuetify'

const REPOSITORIO = 'https://github.com/ocristopfer/nfe-search'

const paginas = [
  { titulo: 'Buscar', rota: '/' },
  { titulo: 'Contribuir', rota: '/contribuir' },
  { titulo: 'Sobre', rota: '/sobre' },
]

const theme = useTheme()

function alternarTema() {
  const proximo = theme.current.value.dark ? 'light' : 'dark'
  theme.change(proximo)
  try {
    localStorage.setItem(TEMA_STORAGE_KEY, proximo)
  } catch {
    // sem storage (aba anônima etc.): o tema vale só para esta visita
  }
}
</script>

<template>
  <v-app>
    <v-app-bar flat border="b" color="surface" density="comfortable">
      <v-container class="d-flex align-center pa-0 px-4" max-width="1040">
        <router-link to="/" class="marca d-flex align-center ga-3 text-decoration-none">
          <v-avatar color="primary" variant="tonal" rounded="lg" size="36">
            <v-icon :icon="mdiFileCheckOutline" size="22" />
          </v-avatar>
          <span class="text-title-large font-weight-bold text-high-emphasis">NFS-e Brasil</span>
        </router-link>

        <v-spacer />

        <nav class="d-none d-sm-flex ga-1 me-2">
          <v-btn v-for="pagina in paginas" :key="pagina.rota" :to="pagina.rota" variant="text" exact>
            {{ pagina.titulo }}
          </v-btn>
        </nav>

        <v-btn
          :icon="theme.current.value.dark ? mdiWhiteBalanceSunny : mdiWeatherNight"
          :aria-label="theme.current.value.dark ? 'Usar tema claro' : 'Usar tema escuro'"
          variant="text"
          @click="alternarTema"
        />
        <v-btn
          :icon="mdiGithub"
          :href="REPOSITORIO"
          target="_blank"
          rel="noopener"
          aria-label="Código no GitHub"
          variant="text"
          class="d-none d-sm-flex"
        />

        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" :icon="mdiMenu" aria-label="Menu" variant="text" class="d-flex d-sm-none" />
          </template>
          <v-list density="compact" min-width="180">
            <v-list-item v-for="pagina in paginas" :key="pagina.rota" :to="pagina.rota" :title="pagina.titulo" exact />
            <v-list-item :href="REPOSITORIO" target="_blank" title="GitHub" :prepend-icon="mdiGithub" />
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container class="py-8 py-md-12" max-width="1040">
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="d-block text-center text-body-small text-medium-emphasis py-6" color="transparent">
      Projeto aberto · dados de municípios do IBGE ·
      <a :href="REPOSITORIO" target="_blank" rel="noopener" class="text-primary">contribua no GitHub</a>
    </v-footer>
  </v-app>
</template>

<style scoped>
.marca {
  color: inherit;
}
</style>
