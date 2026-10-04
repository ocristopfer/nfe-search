# NFS-e Brasil

**Acesse: https://ocristopfer.github.io/nfe-search/**

Encontre o site de verificação de autenticidade de NFS-e (Nota Fiscal de Serviço Eletrônica) da
prefeitura de qualquer município do Brasil.

- Busca entre os 5570 municípios do IBGE, sem precisar acertar acentos, com filtro por UF.
- Quando a prefeitura tem link cadastrado, leva direto à página de verificação.
- Quando não tem, indica a [consulta pública do Portal Nacional da NFS-e](https://www.nfse.gov.br/consultapublica).

## Stack

Vue 3 + Vuetify 4 + Vue Router, Vite, TypeScript e Vitest.

## Desenvolvimento

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm test             # testes (dados + componentes)
npm run typecheck    # checagem de tipos (vue-tsc)
npm run build        # gera a pasta build/
npm run preview      # serve a pasta build/ localmente
npm run check:links  # confere se os links cadastrados ainda respondem
```

## Deploy

Cada push na `master` roda os testes e publica no GitHub Pages (`.github/workflows/deploy.yml`).

## Dados

| Arquivo | Conteúdo |
| --- | --- |
| `src/data/municipios.json` | Municípios do IBGE: código de 7 dígitos, nome e UF. |
| `src/data/sites.json` | Links de verificação por município, identificados pelo código IBGE. |

Para adicionar uma cidade, inclua uma entrada em `src/data/sites.json`:

```json
{
  "ibge": "3550308",
  "url": "https://...",
  "provedor": "Nome do sistema (opcional)",
  "observacao": "Dica para o usuário (opcional)",
  "verificadoEm": "2026-10-04"
}
```

Os testes conferem se o código IBGE existe, se a URL é válida e se não há duplicatas.

### Cobertura (outubro/2026)

3.773 dos 5.570 municípios têm link cadastrado, em todas as 27 UFs. Destes, cerca de 2.100 já usam o
Padrão Nacional e apontam para a consulta pública nacional. Fontes:

- capitais e cidades grandes: pesquisa individual nos sites das prefeituras;
- demais municípios: provedor de cada cidade segundo o cadastro do
  [ACBr](https://projetoacbr.com.br/) (`ACBrNFSeXServicos.ini`), com a URL de verificação de cada
  provedor testada município a município.

Faltam principalmente municípios de provedores sem página pública de verificação conhecida
(MegaSoft, Tinus e outros menores). Rode `npm run check:links` (ou `-- --uf=SP`) para achar links
quebrados.

## Observação sobre o Vite

O projeto usa Vite 7. O Vite 8 troca o bundler pelo Rolldown, cujo binário nativo pode ser
bloqueado por políticas de controle de aplicativos do Windows (Smart App Control/WDAC). Quando isso
não for um problema, a atualização é só trocar `vite` para `^8` e `vitest` para `^5`.
