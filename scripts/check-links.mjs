// Confere se os links cadastrados em src/data/sites.json ainda respondem.
// Uso: npm run check:links
import { readFile } from 'node:fs/promises'

const sites = JSON.parse(await readFile(new URL('../src/data/sites.json', import.meta.url), 'utf8'))
const municipios = JSON.parse(await readFile(new URL('../src/data/municipios.json', import.meta.url), 'utf8'))
const nomes = new Map(municipios.map((m) => [m.ibge, `${m.nome}/${m.uf}`]))

const resultados = await Promise.all(
  sites.map(async ({ ibge, url }) => {
    try {
      const resposta = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(20_000),
        headers: { 'user-agent': 'Mozilla/5.0 (nfe-search link checker)' },
      })
      return { ibge, url, status: resposta.status, ok: resposta.ok }
    } catch (erro) {
      return { ibge, url, status: erro.name === 'TimeoutError' ? 'timeout' : erro.message, ok: false }
    }
  }),
)

for (const r of resultados) {
  console.log(`${r.ok ? 'OK  ' : 'FALHA'} ${String(r.status).padEnd(8)} ${nomes.get(r.ibge) ?? r.ibge}  ${r.url}`)
}

const falhas = resultados.filter((r) => !r.ok)
console.log(`\n${resultados.length - falhas.length}/${resultados.length} links respondendo`)
// Alguns portais bloqueiam acesso automatizado (403) mas funcionam no navegador: revise manualmente.
process.exitCode = falhas.length > 0 ? 1 : 0
