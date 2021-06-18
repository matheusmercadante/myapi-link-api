<h1 align="center">
  <br>
  <img src="https://avatars.githubusercontent.com/u/38729977?s=200&v=4" alt="LinkApi" width="230">
  <br>
  MyApi - Link Api
  <br>
</h1>

<h4 align="center">Projeto feito com TypeScript, Docker, Nestjs ⚡️🔥</h4>

## 🚀 Sobre

Integração:

🚀 [`pipedrive`](https://www.pipedrive.com/pt): Para puxar as oportunidades (deals).

🚀 [`bling`](https://www.bling.com.br/home): Para salvar as oportunidades (deals) do pipedrive como pedido (orders).

🚀 [`mongo`](https://www.mongodb.com/): Para salvar as oportunidades (deals) inseridas no Bling por dia e valor total.

## :zap: Rodando o projeto

### Via Docker

É preciso ter o [Docker](https://www.docker.com/) instaldo em sua máquina. Feito a instalação, rodar os seguintes comandos:

```bash
$ npm run docker:build

$ npm run docker:up # ou npm run docker:logging
```

### Via Script

```bash
#Entra na pasta api, instala dependências e inicia servidor
$ cd api && npm install && npm run start:dev

#Entra na pasta pipedrive, instala dependências e inicia servidor
$ cd pipedrive && npm install && npm run start:dev

# Entra na pasta bling, instala dependências e inicia servidor
cd bling && npm install && npm run start:dev
```

## :notebook: Endpoints

### Api

* `GET /integrations/pipedrive-bling/deals-orders?{api_token}` retorna os deals inseridos no Bling cadastrados no Mongo 

* `GET /integrations/pipedrive-bling/deals-orders/report?{api_token}` retorna os deals inseridos no Bling por dia e valor total cadastrados no Mongo de forma consolidada

* `POST /integrations/pipedrive-bling/deals-orders?{pipedrive_api_token}&{bling_api_token}` cadastra um order no bling a partir de um won deal do pipedrive (irá puxar todos os won deals e cadastrar um por um)

* `GET /bling/orders?{api_token}` retorna todos os orders cadastrados no bling

* `GET /pipedrive/deals?{api_token}` retorna todos os deals cadastrados no pipedrive

### Insomnia

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=MyApi%20Link%20API&uri=https%3A%2F%2Fgithub.com%2Fmatheusmercadante%2Fmyapi-link-api%2Fblob%2Fmain%2F.github%2Finsomnia.json)