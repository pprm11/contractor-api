## Insigths
This read aims to represent the api-readme.
My insights are found in [this page](docs/Insights.md).

## Description
This aplication execute a backend exercise involves building a Node.js/Express.js app that will serve a REST API.

This App aim to be a system which manages `Contracts` between `Clients`and `Contractors` .

It has 3 target users:
  * `Client`: Ones who want to have some services dones and pay for It
  * `Contractor`: Ones who execute these services and receive the money for It
  * `Admin`: Ones who manage the system and gather some business insights from it.

This is a RESTFUL API with the following resources:

* `admin`: It Represents back office and data insight endpoints.
* `contracts`: It represents the services asked in the system
* `jobs`: It represents payable steps in a contract.
* `balance`: It represents the balance a user has

### API
  # Headers
* It is necessary to send `profile-id` in the header to have permission to use the endpoints. Ex: profile-id=1

  # Endpoints
* GET /contracts/:id
* GET /contracts
* GET /jobs/unpaid
* POST /jobs/:job_id/pay
* GET /admin/best-profession?start=<date>&end=<date> 
* GET /admin/best-clients?start=<date>&end=<date>&limit=<integer> 

## Running the api

### Requirements

- Node 18
- Docker
- yarn

### Installation

```bash
$ yarn install
```

### Starting database

```bash
$ docker-compose up
```


### Migrate the database
```bash
$ yarn migrate:dev
```

### Seeding the Api
```bash
$ yarn seed
```

### Running the app

```bash
* development
$ yarn run start
```
* watch mode
```bash
$ yarn run start:dev
```
* production mode
```bash
$ yarn run start:prod
```

### Test

* test
```bash
$ yarn run test
```
* test coverage
```bash
$ yarn run test:cov
```

### Formats

* Lint
```bash
$ yarn lint
```
* Prettier
```bash
$ yarn format
```

## Folder structure
* **Prisma**:
  * **migrations** - Auto Generated
  * **views** - You put your views on that
  * **schema.prisma** - You put your model, views and related enums

* **Scripts**: `Scripts` to be run on enviroments

* **Src**
  * **api**: You define a api for each resource on the restful api
  * **lib**: Everything used by the apis

## Anatomy of the src
* The `src` is divided in `api` e `lib`
* `Api` respresents the submodules equivalents to a `restful resource`
* `Lib` represents submodules that are used by apis
* The name of a file is composed by "resouce-name"."type".ts
* If there is more than one `resource` with same `type`, the `type` becomes a folder

* **Types**: This is not a extensive list
  * **controller**
  * **module**
  * **service**
  * **dto**
  * **entity**
  * **interface**
  * **type**
  * **class**

* The **test** has same name as the `subject` adding the suffix *.spec.ts *instead of *.ts*

* **Rules** that depends on `parameters`, `body` or `query` go to the `service`
* **Rules** there are intrinsic of `endpoint` and/or `user` `permissions` go to the `casl`

##
* The **database** runs in **postgres**
## Depedences

### Production
* **casl**:
* **class-transformer**
* **class-validator**
* **reflect-metadata**
* **rxjs**

### Development
* **nestjs**:
* **eslint**:
* **jest**:
* **prettier**:
* **prisma**:
* **ts-node**:


