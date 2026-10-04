// Confere se os links cadastrados em src/data/sites.json ainda respondem.
// Uso: npm run check:links [-- --uf=RJ]
import { readFile } from 'node:fs/promises'

const CONCORRENCIA = 16
const filtroUf = process.argv.find((a) => a.startsWith('--uf='))?.slice(5).toUpperCase()

const sites = JSON.parse(await readFile(new URL('../src/data/sites.json', import.meta.url), 'utf8'))
const municipios = JSON.parse(await readFile(new URL('../src/data/municipios.json', import.meta.url), 'utf8'))
const porIbge = new Map(municipios.map((m) => [m.ibge, m]))

// cada URL é testada uma vez, mesmo quando atende vários municípios (portal nacional, Betha...)
const cidadesPorUrl = new Map()
for (const { ibge, url } of sites) {
  const m = porIbge.get(ibge)
  if (filtroUf && m?.uf !== filtroUf) continue
  const nome = m ? `${m.nome}/${m.uf}` : ibge
  cidadesPorUrl.set(url, [...(cidadesPorUrl.get(url) ?? []), nome])
}

async function testar(url) {
  try {
    const resposta = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
      headers: { 'user-agent': 'Mozilla/5.0 (nfe-search link checker)' },
    })
    return { url, status: resposta.status, ok: resposta.ok }
  } catch (erro) {
    const motivo = erro.name === 'TimeoutError' ? 'timeout' : (erro.cause?.code ?? erro.message)
    return { url, status: motivo, ok: false }
  }
}

const urls = [...cidadesPorUrl.keys()]
const resultados = []
let proxima = 0
await Promise.all(
  Array.from({ length: CONCORRENCIA }, async () => {
    while (proxima < urls.length) resultados.push(await testar(urls[proxima++]))
  }),
)

const falhas = resultados.filter((r) => !r.ok)
for (const r of falhas) {
  const cidades = cidadesPorUrl.get(r.url)
  const rotulo = cidades.length > 3 ? `${cidades.length} municípios` : cidades.join(', ')
  console.log(`FALHA ${String(r.status).padEnd(10)} ${rotulo}  ${r.url}`)
}
console.log(`\n${resultados.length - falhas.length}/${resultados.length} URLs respondendo`)
// Alguns portais bloqueiam acesso automatizado (403) mas funcionam no navegador: revise manualmente.
process.exitCode = falhas.length > 0 ? 1 : 0
