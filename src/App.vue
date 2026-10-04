<script setup lang="ts">
import { mdiFileSearchOutline, mdiGithub } from '@mdi/js'

const paginas = [
  { titulo: 'Buscar', rota: '/' },
  { titulo: 'Contribuir', rota: '/contribuir' },
  { titulo: 'Sobre', rota: '/sobre' },
]
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <template #prepend>
        <v-icon :icon="mdiFileSearchOutline" class="ms-2" />
      </template>
      <v-app-bar-title>
        <router-link to="/" class="text-white text-decoration-none">NFS-e Brasil</router-link>
      </v-app-bar-title>
      <template #append>
        <v-btn
          v-for="pagina in paginas"
          :key="pagina.rota"
          :to="pagina.rota"
          variant="text"
          class="d-none d-sm-flex"
        >
          {{ pagina.titulo }}
        </v-btn>
        <v-btn
          :icon="mdiGithub"
          href="https://github.com/ocristopfer/nfe-search"
          target="_blank"
          rel="noopener"
          aria-label="Código no GitHub"
        />
      </template>
    </v-app-bar>

    <v-main>
      <v-container class="py-6" max-width="900">
        <v-btn-toggle class="d-flex d-sm-none mb-4" density="compact" variant="outlined" divided>
          <v-btn v-for="pagina in paginas" :key="pagina.rota" :to="pagina.rota" class="flex-grow-1">
            {{ pagina.titulo }}
          </v-btn>
        </v-btn-toggle>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
