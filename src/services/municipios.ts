import municipiosData from '@/data/municipios.json'
import sitesData from '@/data/sites.json'

export interface Municipio {
  /** Código IBGE de 7 dígitos */
  ibge: string
  nome: string
  uf: string
}

export interface SiteNfse {
  ibge: string
  url: string
  provedor?: string
  observacao?: string
  /** Sistema municipal antigo, mantido para consultar notas emitidas antes da migração */
  urlAnterior?: string
  /** Data (AAAA-MM-DD) da última vez que o link foi conferido */
  verificadoEm: string
}

/** Consulta pública do Ambiente de Dados Nacional da NFS-e (padrão nacional). */
export const PORTAL_NACIONAL_URL = 'https://www.nfse.gov.br/consultapublica'

export const municipios: readonly Municipio[] = municipiosData
export const sites: readonly SiteNfse[] = sitesData

const sitesPorIbge = new Map(sites.map((site) => [site.ibge, site]))

export const ufs: readonly string[] = [...new Set(municipios.map((m) => m.uf))].sort()

/** Minúsculas e sem acentos, para comparar "sao paulo" com "São Paulo". */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
}

export function rotuloMunicipio(municipio: Municipio): string {
  return `${municipio.nome} — ${municipio.uf}`
}

export function buscarSite(ibge: string): SiteNfse | undefined {
  return sitesPorIbge.get(ibge)
}

export function buscarMunicipio(ibge: string): Municipio | undefined {
  return municipios.find((m) => m.ibge === ibge)
}

export function filtrarMunicipios(termo: string, uf?: string | null): Municipio[] {
  const busca = normalizar(termo.trim())
  return municipios.filter(
    (m) => (!uf || m.uf === uf) && (busca === '' || normalizar(m.nome).includes(busca)),
  )
}

export const municipiosComSite: readonly Municipio[] = municipios.filter((m) => sitesPorIbge.has(m.ibge))

const IBGE_CAPITAIS = [
  '1200401', '2704302', '1600303', '1302603', '2927408', '2304400', '5300108', '3205309', '5208707',
  '2111300', '5103403', '5002704', '3106200', '1501402', '2507507', '4106902', '2611606', '2211001',
  '3304557', '2408102', '4314902', '1100205', '1400100', '4205407', '3550308', '2800308', '1721000',
]

export const capitais: readonly Municipio[] = municipios
  .filter((m) => IBGE_CAPITAIS.includes(m.ibge))
  .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

export const cobertura = (() => {
  const padraoNacional = sites.filter((s) => s.url === PORTAL_NACIONAL_URL).length
  const siteProprio = sites.length - padraoNacional
  return {
    total: municipios.length,
    siteProprio,
    padraoNacional,
    semCadastro: municipios.length - sites.length,
  }
})()
