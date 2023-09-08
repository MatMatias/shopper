# Shopper Fullstack Challenge

## About:

This project is the implementation of the Full Stack Challenge, from [Shopper](https://landing.shopper.com.br/).

## Technologies used:

### Webapp:

- [React](https://react.dev/) ^18.2.0
- [Typescript](https://www.typescriptlang.org/) ^5.0.2
- [Vite](https://vitejs.dev/) ^4.4.5
- [CSS Modules](https://github.com/css-modules/css-modules)

### Webservice:

- [NodeJS](https://nodejs.org/) ^18.17.1
- [Typescript](https://www.typescriptlang.org/) ^5.1.6
- [Express](https://expressjs.com/) ^4.18.2

### Database:

- [MySQL](https://www.mysql.com/) 8.0

## Run the project:

DISCLAIMER: ALL of the terminal commands contained in this README.md assumes that you are in the ROOT directory of the project.

- First, setup the environment variables. To do it, run the following command in your terminal:

  ```bash
  cp .env.example ./.env
  ```

  Then, you can change the .env variables if you want it. But it is not needed to run the project.

- There are two ways to run this project:
  1. With [Docker](https://www.docker.com/)
  2. Without [Docker](https://www.docker.com/)

### With Docker:

To run the project with docker, you'll need to have it [installed](https://docs.docker.com/get-docker/).

- Prerequisites:

  - Bash compatible terminal
  - xargs
  - source
  - export
    These programs are builtin in most of unix like Operating Systems.

- To start the project, run the following command in your terminal:
  ```bash
  docker compose up -d
  ```
  - If you need to see the webapp logs, run:
    ```bash
    docker logs -f webapp
    ```
  - If you need to see the webservice logs, run:
    ```bash
    docker logs -f webservice
    ```
  - If you need to see the database logs, run:
    ```bash
    docker logs -f database
    ```
  - If you need to interact with the database, run:
    ```bash
    docker exec -it database /bin/sh
    source ./.env && export $(grep DB_DEV_PASSWORD /.env | xargs)
    source ./.env && export $(grep DB_DEV_USER /.env | xargs)
    source ./.env && export $(grep DB_NAME /.env | xargs)
    mysql -u $DB_DEV_USER --password=$DB_DEV_PASSWORD -D $DB_NAME
    exit
    ```
  - If you want to clear the database, run the following commands:
    ```bash
    docker exec -it database /bin/sh
    source ./.env && export $(grep DB_DEV_PASSWORD /.env | xargs)
    source ./.env && export $(grep DB_DEV_USER /.env | xargs)
    source ./.env && export $(grep DB_NAME /.env | xargs)
    mysql -u $DB_DEV_USER --password=$DB_DEV_PASSWORD -D $DB_NAME </database_scripts/clear-database.sql
    exit
    ```
  - If you want to repopulate the database, run the following commands:
    ```bash
    docker exec -it database /bin/sh
    source ./.env && export $(grep DB_DEV_PASSWORD /.env | xargs)
    source ./.env && export $(grep DB_DEV_USER /.env | xargs)
    source ./.env && export $(grep DB_NAME /.env | xargs)
    mysql -u $DB_DEV_USER --password=$DB_DEV_PASSWORD -D $DB_NAME <./database_scripts/populate-database.sql
    exit
    ```
  - To stop the project, run:
    ```bash
    docker compose down
    ```

### Without Docker:

- To run without docker, you'll need to have [MySQL](https://www.mysql.com/) version 8 installed and running in your local port 3306 (or your custom database port, if you changed the DB_LOCAL_PORT .env variable)
- You will also need [NodeJS](https://nodejs.org/) v^18.17.1

- Install the webservice dependencies and run it:
  Run the following command in your terminal:
  ```bash
  cd backend
  npm install && npm run dev
  ```
- Install the webapp dependencies and run it:
  ```bash
  cd frontend
  npm install && npm run dev
  ```

## Accessing the services:

### Webapp

The webapp will be availabe in http://localhost:4000, or in your custom port, in case you changed the .env VITE_LOCAL_PORT variable.

### Webservice

The webservice will be available in http://localhost:3000, or in your custom port, in case you changed the .env PORT variable

- The endpoints are:
  - /api/validate: validates the csv file and return the list of products that are being targeted to have their prices updated.
  - /api/update/:product_code: update the the product with \[product_code\] with the json: { new_price: [\new_price\] }

<!-- ## Política de atualização de preços

1. arquivo CSV: product_code, new_price
2. preço de venda > preço de custo V
3. reajustes tem que ser de 10% V
4. alguns produtos são vendidos em pacotes
   4.1) reajuste de pacote deve reajustar o preço dos produtos para dar match no novo preço
   4.2) reajuste no produto deve causar reajuste no preço do pacote

## Backend:

- endpoint /api/validate POST

  1. Deve aceitar um CSV de precificação V
  2. Deve verificar se os campos necessários existem V
  3. Deve verificar se os produtos informados existem V
  4. Deve verificar se os preços estão preenchdios e são valores numéricos válidos V
  5. Deve verificar se o arquivo respeita a política de Atualização de preços
  6. Deve enviar as seguintes infos. dos produtos enviados: Codigo, Nome, Preço Atual, Novo preço

- endpoint /api/update POST
  1. Deve atualizar o novo preço no banco de dados

## Frontend:

1.  Deve permitir o usuário carregar um CSV
2.  Após carregar o CSV, tem que aparecer um botão chamado VALIDAR que vai fazer req POST para /api/validate
3.  Deve exibir as infos. enviadas pela resposta da req. anterior.
4.  Após a validação, deve aparecer um botão ATUALIZAR que vai fazer req. POST para /api/update e vai fazer a tela voltar para o envio de um novo arquivo -->
