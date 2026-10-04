import { describe, expect, it } from 'vitest'
import {
  buscarSite,
  filtrarMunicipios,
  municipios,
  municipiosComSite,
  normalizar,
  sites,
  ufs,
} from './municipios'

describe('dados', () => {
  it('tem todos os municípios e UFs do IBGE', () => {
    expect(municipios).toHaveLength(5570)
    expect(ufs).toHaveLength(27)
  })

  it('não repete códigos IBGE', () => {
    expect(new Set(municipios.map((m) => m.ibge)).size).toBe(municipios.length)
    expect(new Set(sites.map((s) => s.ibge)).size).toBe(sites.length)
  })

  it('todos os sites são válidos', () => {
    const ibges = new Set(municipios.map((m) => m.ibge))
    // alguns portais municipais ainda só respondem em http
    const urlValida = (url: string) => {
      try {
        return /^https?:$/.test(new URL(url).protocol)
      } catch {
        return false
      }
    }
    const invalidos = sites.filter(
      (s) =>
        !ibges.has(s.ibge) ||
        !urlValida(s.url) ||
        (s.urlAnterior !== undefined && !urlValida(s.urlAnterior)) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(s.verificadoEm),
    )
    expect(invalidos).toEqual([])
  })

  it('lista os municípios que têm site', () => {
    expect(municipiosComSite).toHaveLength(sites.length)
  })
})

describe('busca', () => {
  it('normaliza acentos e maiúsculas', () => {
    expect(normalizar('São João del-Rei')).toBe('sao joao del-rei')
  })

  it('encontra município sem acento e filtra por UF', () => {
    expect(filtrarMunicipios('goiania').map((m) => m.nome)).toContain('Goiânia')
    const mesquita = filtrarMunicipios('mesquita', 'RJ')
    expect(mesquita).toHaveLength(1)
    expect(buscarSite(mesquita[0].ibge)).toBeDefined()
  })

  it('sem termo devolve todos os municípios da UF', () => {
    expect(filtrarMunicipios('', 'DF')).toEqual([{ ibge: '5300108', nome: 'Brasília', uf: 'DF' }])
  })
})
