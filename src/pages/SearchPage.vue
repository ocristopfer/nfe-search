<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mdiBankOutline, mdiEarth, mdiHelpCircleOutline, mdiMagnify, mdiMapMarkerOutline } from '@mdi/js'
import MunicipioResultado from '@/components/MunicipioResultado.vue'
import {
  buscarMunicipio,
  capitais,
  cobertura,
  municipios,
  normalizar,
  rotuloMunicipio,
  ufs,
} from '@/services/municipios'

const route = useRoute()
const router = useRouter()

// o município escolhido fica na URL (?m=<código IBGE>) para o link poder ser compartilhado
const ibgeInicial = typeof route.query.m === 'string' && buscarMunicipio(route.query.m) ? route.query.m : null
const ibgeSelecionado = ref<string | null>(ibgeInicial)
const uf = ref<string | null>(null)

watch(ibgeSelecionado, (ibge) => {
  router.replace({ query: ibge ? { m: ibge } : {} })
})

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

function selecionar(ibge: string) {
  ibgeSelecionado.value = ibge
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const numero = (n: number) => n.toLocaleString('pt-BR')
const percentual = (n: number) => `${((n / cobertura.total) * 100).toFixed(1).replace('.', ',')}%`

const faixas = [
  { chave: 'siteProprio', rotulo: 'Site da prefeitura', cor: 'primary', icone: mdiBankOutline },
  { chave: 'padraoNacional', rotulo: 'Padrão Nacional', cor: 'secondary', icone: mdiEarth },
  { chave: 'semCadastro', rotulo: 'Ainda sem cadastro', cor: 'warning', icone: mdiHelpCircleOutline },
] as const
</script>

<template>
  <section class="text-center mx-auto mb-8" style="max-width: 840px">
    <v-chip color="primary" variant="tonal" size="small" class="mb-4" :prepend-icon="mdiMapMarkerOutline">
      {{ numero(cobertura.siteProprio + cobertura.padraoNacional) }} municípios cadastrados
    </v-chip>
    <h1 class="titulo font-weight-bold mb-3">Verifique a autenticidade de uma NFS-e</h1>
    <p class="text-body-large text-medium-emphasis">
      Escolha o município que emitiu a nota fiscal de serviço e vá direto à página de verificação da
      prefeitura ou do Portal Nacional.
    </p>
  </section>

  <v-card class="busca mx-auto mb-6 pa-2 pa-sm-3" max-width="820">
    <div class="d-flex flex-column flex-sm-row ga-3">
      <v-select
        v-model="uf"
        :items="ufs"
        label="UF"
        clearable
        hide-details
        class="campo-uf flex-grow-0"
        @update:model-value="aoTrocarUf"
      />
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
        autofocus
      />
    </div>
  </v-card>

  <v-expand-transition>
    <div v-if="selecionado" class="mx-auto mb-10" style="max-width: 820px">
      <MunicipioResultado :municipio="selecionado" />
    </div>
  </v-expand-transition>

  <section class="mb-10">
    <h2 class="text-title-large font-weight-bold mt-0 mb-1">Capitais</h2>
    <p class="text-body-medium text-medium-emphasis mb-4">Atalho para as consultas mais procuradas.</p>
    <div class="capitais">
      <v-chip
        v-for="m in capitais"
        :key="m.ibge"
        :color="m.ibge === ibgeSelecionado ? 'primary' : 'surface-light'"
        variant="flat"
        class="capital justify-space-between"
        @click="selecionar(m.ibge)"
      >
        <span class="text-truncate">{{ m.nome }}</span>
        <span class="uf ms-2 text-label-small">{{ m.uf }}</span>
      </v-chip>
    </div>
  </section>

  <section>
    <h2 class="text-title-large font-weight-bold mt-0 mb-1">Cobertura</h2>
    <p class="text-body-medium text-medium-emphasis mb-4">
      Situação dos {{ numero(cobertura.total) }} municípios brasileiros na base.
    </p>
    <v-card class="pa-5">
      <div class="barra mb-5" role="img" aria-label="Distribuição da cobertura dos municípios">
        <div
          v-for="faixa in faixas"
          :key="faixa.chave"
          :class="faixa.chave === 'semCadastro' ? 'faixa-vazia' : `bg-${faixa.cor}`"
          :style="{ flexGrow: cobertura[faixa.chave] }"
        />
      </div>
      <v-row dense>
        <v-col v-for="faixa in faixas" :key="faixa.chave" cols="12" sm="4">
          <div class="d-flex align-center ga-3">
            <v-avatar :color="faixa.cor" variant="tonal" rounded="lg">
              <v-icon :icon="faixa.icone" />
            </v-avatar>
            <div>
              <div class="text-title-large font-weight-bold">{{ numero(cobertura[faixa.chave]) }}</div>
              <div class="text-body-small text-medium-emphasis">
                {{ faixa.rotulo }} · {{ percentual(cobertura[faixa.chave]) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-4" />
      <div class="d-flex flex-wrap align-center justify-space-between ga-3">
        <span class="text-body-medium text-medium-emphasis">
          Conhece o site de uma cidade que ainda não está aqui?
        </span>
        <v-btn to="/contribuir" color="primary" variant="tonal">Sugerir link</v-btn>
      </div>
    </v-card>
  </section>
</template>

<style scoped>
.campo-uf {
  min-width: 120px;
}

@media (min-width: 600px) {
  .campo-uf {
    max-width: 140px;
  }
}

.titulo {
  font-size: clamp(1.75rem, 1.2rem + 2.4vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.capital {
  height: 36px;
}

.capital .uf {
  opacity: 0.7;
}

.faixa-vazia {
  background: rgba(var(--v-theme-on-surface), 0.14);
}

.capitais {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 8px;
}

.barra {
  display: flex;
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  gap: 3px;
}
</style>
