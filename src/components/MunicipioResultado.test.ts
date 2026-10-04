import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { createMemoryHistory, createRouter } from 'vue-router'
import MunicipioResultado from './MunicipioResultado.vue'
import { PORTAL_NACIONAL_URL } from '@/services/municipios'

// O jsdom não implementa ResizeObserver, usado internamente pelo Vuetify.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

function montar(municipio: { ibge: string; nome: string; uf: string }) {
  const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/:p(.*)*', component: {} }] })
  return mount(MunicipioResultado, {
    props: { municipio },
    global: { plugins: [createVuetify(), router] },
  })
}

describe('MunicipioResultado', () => {
  it('mostra o link da prefeitura quando cadastrado', () => {
    const wrapper = montar({ ibge: '3304557', nome: 'Rio de Janeiro', uf: 'RJ' })
    const links = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(links).toContain('https://notacarioca.rio.gov.br/documentos/verificacao.aspx')
    expect(wrapper.text()).toContain('Nota Carioca')
  })

  it('mostra o Portal Nacional e o sistema anterior para quem migrou', () => {
    const wrapper = montar({ ibge: '4106902', nome: 'Curitiba', uf: 'PR' })
    const links = wrapper.findAll('a').map((a) => a.attributes('href'))
    expect(wrapper.text()).toContain('padrão nacional')
    expect(links).toContain(PORTAL_NACIONAL_URL)
    expect(links).toContain('https://notacuritibana.curitiba.pr.gov.br/NotaRPS/AutenticidadeNota')
    expect(wrapper.text()).not.toContain('Abrir site da prefeitura')
  })

  it('indica o Portal Nacional quando não há link', () => {
    const wrapper = montar({ ibge: '0000000', nome: 'Município sem link', uf: 'XX' })
    expect(wrapper.text()).toContain('Ainda sem link cadastrado')
    expect(wrapper.findAll('a').map((a) => a.attributes('href'))).toContain(PORTAL_NACIONAL_URL)
  })
})
