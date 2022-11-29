# pagination demo

Demo application for **Full-stack pagination strategies** meetup talk ([slides here](https://docs.google.com/presentation/d/1TVvLTbkFy4xiFZeUNqH2rbVdJ3KMpdAZhX-yr6lWAPw/edit?usp=sharing)).

## Setup

Prerequisites:

- Node.js
- Docker

Install NPM dependencies with:

```sh
npm install
```

## Usage

To start local MongoDB database, Fastify server and Angular client:

```sh
npm run dev
```

To set desired amount of fake data in database:

```sh
npm run db:fill
```

To test out performance without indexes:

```sh
npm run db:indexes:drop
```

To create indexes again:

```sh
npm run db:indexes:create
```
