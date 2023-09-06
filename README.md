# Shopper Fullstack Challenge

## Política de Preços

1. arquivo CSV: product_code, new_price
2. preço de venda > preço de custo
3. reajustes tem que ser de 10%
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
4.  Após a validação, deve aparecer um botão ATUALIZAR que vai fazer req. POST para /api/update e vai fazer a tela voltar para o envio de um novo arquivo

<!-- ================== TODO ====================== -->
<!-- TRATAMENTO DE ERROS DO MULTER -->
<!-- VERIFICAR NECESSIDADE DO MIDDLEWARE DE ERROS -->

## Run with docker:

1. build image:

```bash
$ docker build -t webservice backend/Dockerfile
```

2. run docker container:

```bash
$ docker compose up --detach
```

### If for some reason the database is not filled up when starting with docker compose up, run:

```bash
$ source ./backend/.env && export $(grep DB_DEV_PASSWORD ./backend/.env | xargs)
$ source ./backend/.env && export $(grep DB_NAME ./backend/.env | xargs)
$ docker exec database /bin/sh -c 'mysql -u root --password=$DB_DEV_PASSWORD -D $DB_NAME </scripts/populate-database.sql'
```

### If you want to clear the database, run:

```bash
$ source ./backend/.env && export $(grep DB_DEV_PASSWORD ./backend/.env | xargs)
$ source ./backend/.env && export $(grep DB_NAME ./backend/.env | xargs)
$ docker exec database /bin/sh -c 'mysql -u root --password=$DB_DEV_PASSWORD -D $DB_NAME </scripts/clear-database.sql'
```

### Stoping the project:

```bash
$ docker compose down
```

## Interacting with the application:

- To access the database container:

```bash
$ docker exec -it database /bin/sh
```

- To access the webservice container:

```bash
$ docker exec -it webservice /bin/sh
```
