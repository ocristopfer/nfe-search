<script setup lang="ts">
import { PORTAL_NACIONAL_URL } from '@/services/municipios'
</script>

<template>
  <h1 class="text-headline-medium mb-4">Sobre</h1>
  <v-card>
    <v-card-text class="text-body-large">
      <p class="mb-4">
        Cada prefeitura do Brasil tem (ou tinha) seu próprio sistema de Nota Fiscal de Serviço
        Eletrônica, e encontrar a página de verificação de autenticidade de uma nota costuma ser uma
        busca demorada. O <strong>NFS-e Brasil</strong> reúne esses links em um só lugar.
      </p>
      <p class="mb-4">
        A lista de municípios vem do IBGE. Os links das prefeituras foram levantados nos sites das
        próprias prefeituras e, para as cidades menores, a partir do provedor de cada município
        segundo o cadastro do projeto <a href="https://projetoacbr.com.br/" target="_blank" rel="noopener">ACBr</a>,
        e são conferidos periodicamente. Quando um município ainda não tem link, indicamos a
        <a :href="PORTAL_NACIONAL_URL" target="_blank" rel="noopener noreferrer">
          consulta pública do Portal Nacional da NFS-e</a>, que concentra as notas emitidas no padrão nacional.
      </p>
      <p>
        O projeto é aberto e depende de contribuições. Conhece o site da sua cidade?
        <router-link to="/contribuir">Ajude a completar a lista</router-link>.
      </p>
    </v-card-text>
  </v-card>
</template>
