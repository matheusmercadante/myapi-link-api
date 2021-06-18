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

* Api Server: http://localhost:3333

### Via Script

```bash
#Entra na pasta api, instala dependências e inicia servidor
$ cd api && npm install && npm run start:dev

#Entra na pasta pipedrive, instala dependências e inicia servidor
$ cd pipedrive && npm install && npm run start:dev

# Entra na pasta bling, instala dependências e inicia servidor
cd bling && npm install && npm run start:dev
```

* Api Server: http://localhost:3333

## :notebook: Endpoints

### Antes de testar, saiba:

*pipedrive-token: 88c5683001c1733432b2aa6c3142de2dc36f28d4*
</br>
*bling-token: 3b0fc4b0021aaa22e0b204931faacf46a417b2a044f3d1f21fdaee2e196471bd43056ccb*

1. É importante ressaltar que é necessário ter won deals no pipedrive. Por padrão, 5 won deals está cadastrado.

2. Também é importante saber que caso um won deal já esteja cadastrado no bling como order, ele não irá salvar no mongodb, não retornando nenhum dado na terceira rota abaixo: </br>
    ```bash
      POST /integrations/pipedrive-bling/deals-orders?{pipedrive_api_token}&{bling_api_token}
    ```

3. Para cadastrar um novo order no bling, adicione um novo won deal no pipedrive, com a seguinte rota: </br>
    ```bash
      POST https://qrhub.pipedrive.com/api/v1/deals?{api_token}
      BODY {
          "title": "Deal Exemplo",
          "org_id": 0,
          "status": "won",
          "value": 1000,
          "user_id": 12384292,
          "currency": "BRL",
          "expected_close_date": "2021-06-18"
        }
     ```

### Api

* Retorna os deals inseridos no Bling cadastrados no Mongo:
    ```bash
      GET /integrations/pipedrive-bling/deals-orders?{api_token}

      Query Params:
        - api_token: 3b0fc4b0021aaa22e0b204931faacf46a417b2a044f3d1f21fdaee2e196471bd43056ccb (bling-token)
    ```

* Retorna os deals inseridos no Bling por dia e valor total cadastrados no Mongo de forma consolidada:
    ```bash
     GET /integrations/pipedrive-bling/deals-orders/report?{api_token}

     Query Params:
        - api_token: 3b0fc4b0021aaa22e0b204931faacf46a417b2a044f3d1f21fdaee2e196471bd43056ccb (bling-token)
    ```
    
* Cadastra um order no bling a partir de um won deal do pipedrive (irá puxar todos os won deals e cadastrar um por um):
    ```bash
     POST /integrations/pipedrive-bling/deals-orders?{pipedrive_api_token}&{bling_api_token}

     Query Params:
        - pipedrive_api_token: 88c5683001c1733432b2aa6c3142de2dc36f28d4 (pipedrive-token)
        - bling_api_token: 3b0fc4b0021aaa22e0b204931faacf46a417b2a044f3d1f21fdaee2e196471bd43056ccb (bling-token)
    ```

* Retorna todos os orders cadastrados no Bling
    ```bash
      GET /bling/orders?{api_token}

      Query Params:
        - api_token: 3b0fc4b0021aaa22e0b204931faacf46a417b2a044f3d1f21fdaee2e196471bd43056ccb (bling-token)
    ```

* Retorna todos os deals cadastrados no Pipedrive
    ```bash
      GET /pipedrive/deals?{api_token}
      
      Query Params:
        - api_token: 88c5683001c1733432b2aa6c3142de2dc36f28d4 (pipedrive-token)
    ```

### Insomnia

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=MyApi%20Link%20API&uri=https%3A%2F%2Fgithub.com%2Fmatheusmercadante%2Fmyapi-link-api%2Fblob%2Fmain%2F.github%2Finsomnia.json)
