# Política de segurança

O NFS-e Brasil é um site estático: a busca roda inteiramente no navegador, não há
backend nem login, e o site apenas aponta para páginas das prefeituras e do Portal
Nacional da NFS-e. Ainda assim, problemas de segurança são levados a sério.

## Como reportar uma vulnerabilidade

**Não** abra uma issue pública. Use o relatório privado de vulnerabilidades do
GitHub (botão "Report a vulnerability" na aba **Security** do repositório) e informe:

- o que é afetado (site publicado, um link cadastrado, workflow de deploy,
  script `check:links`);
- os passos para reproduzir, ou uma prova de conceito;
- o navegador e, se for o caso, o commit ou a data em que observou o problema.

Você deve receber uma resposta em alguns dias. A correção é publicada na `master`
e vai para o ar no deploy seguinte.

## Versões suportadas

Apenas a versão publicada em https://ocristopfer.github.io/nfe-search/ (a branch
`master`) recebe correções.

## Escopo

Dentro do escopo, por exemplo:

- XSS ou injeção de conteúdo no site;
- **um link cadastrado em `src/data/sites.json` que leve a um site falso, de
  phishing, ou a um domínio que expirou e mudou de dono** — reporte de forma
  privada para que o link seja removido antes de ser divulgado;
- workflows do GitHub Actions que permitam a terceiros executar código com as
  permissões do repositório;
- dependências npm vulneráveis que de fato afetem o site publicado.

Fora do escopo: vulnerabilidades nos sites das prefeituras, dos provedores de
NFS-e ou do Portal Nacional — reporte diretamente a quem os mantém. Links
quebrados ou desatualizados (sem risco ao usuário) podem ser corrigidos com uma
issue ou um PR normal.
