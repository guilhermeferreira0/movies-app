# Movies App

Este é um projeto desenvolvido em NestJS que utiliza autenticação JWT com tokens de acesso e refresh. O frontend é construído com Angular. Ambos os serviços estão containerizados usando Docker e a integração contínua é configurada através do GitHub Actions.


## Tecnologias Utilizadas

- **Backend**: NestJS
- **Frontend**: Angular
- **Autenticação**: JWT (Access Token e Refresh Token)
- **Containerização**: Docker
- **CI/CD**: GitHub Actions


## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Node.js](https://nodejs.org/) (para desenvolvimento local)
- [Angular CLI](https://angular.io/cli) (para desenvolvimento local do frontend)
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/guilhermeferreira0/movies-app.git
```

Entre no diretório do projeto

```bash
  cd movies-app
```

#### Ambiente de Desenvolvimento
Para iniciar ambos os serviços em modo de desenvolvimento, execute os comandos abaixo em seus respectivos diretórios:

Backend

```bash
  cd server
  docker-compose up -d --build 
```

Frontend

```bash
  cd web
  docker-compose up -d --build 
```

#### Ambiente de Produção
Para construir e rodar a aplicação em produção, execute os comandos abaixo em seus respectivos diretórios:

Backend

```bash
  cd server
  docker-compose -f docker-compose.prod.yml up -d --build
```

Frontend

```bash
  cd web
  docker-compose -f docker-compose.prod.yml up -d --build
```
## Contribuindo

Pode mandar ver e fazer seu _Pull Request_ (PR, para os íntimos).
- Basta dar um Fork no projeto.
- Clonar esse Fork (está lá no seu perfil pessoal) na sua máquina.
- Fazer seus belíssimos commits de contribuição. 
  - Recomendo criar uma branch especialmente para cada contexto de PR que você está fazendo.
  > Exemplo: `improvement/add-awesome-and-fantastic-file`, e mandar ver nessas alterações.
- Criar o _Pull Request_ com:
  - Titulo: seja sucinto e coerente, nada de titulos que mais parecem uma URL.
  - Descrição: fez algo daora? Que tal dizer por onde começou e porquê?  

