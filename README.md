[MiguelColl]: https://github.com/MiguelColl
[LtVish]: https://github.com/LtVish
[DanielAlmazan]: https://github.com/DanielAlmazan
![Nest hotel logo](assets/hotel_nest-logo.svg)

# HOTEL NEST

## Cleaning services <a href="https://github.com/MiguelColl"><img src="https://avatars.githubusercontent.com/u/114687157?v=4" style="height: 30px; transform: translateY(7px); border-radius: 5px"></a>
Responsible:
[Miguel Collado][MiguelColl]

### Cleaning routes
#### GET
> [!CAUTION]  
> Not implemented  
> '/limpieza/:id'

> [!CAUTION]  
> Not implemented  
> '/limpieza/limpia/:id'

> [!CAUTION]  
> Not implemented  
> '/limpieza/limpias'

#### POST
> [!CAUTION]  
> Not implemented  
> '/limpieza'

Request example:
```json5
{
  "numero": 1, // number
  "tipo": "individual", // enum: string
  "precio": 1, // number
  "descripcion": "Bastante amplia, para ser individual.", // string
  "imagen": "1711588324_habitacion1.png", // Optional {{timestamp}}_{{filename}}
  "ultimaLimpieza": "'2024-02-22T10:28:32.980Z" // Default Date.now
}
```

#### PUT
> [!CAUTION]  
> Not implemented  
> '/limpieza/:id'

## Authentication service <a href="https://github.com/LtVish"><img src="https://avatars.githubusercontent.com/u/119342012?v=4"  style="height: 40px; transform: translateY(7px); border-radius: 7px"></a>
Responsible: 
[Aitor Moreno Iborra][LtVish]

## Testing <a href="https://github.com/DanielAlmazan"><img src="https://avatars.githubusercontent.com/u/114589538?v=4" style="height: 40px; transform: translateY(7px); border-radius: 5px"></a>
Responsible:
[Daniel Enrique Almazán Sellés][DanielAlmazan]

> [!CAUTION]  
> Not implemented
```bash
$ node test/axiosTests.ts
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
