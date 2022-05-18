# JBL SIMPE 

Here we will document everything required to run JBL - SIMPLE.

## Prerequisites

- A database PostgreSQL
- npm.

## Instalation

- Download JBL Simple [here](https://github.com/endropie/jbl)

### JBL Serve (hapijs)
- directory "/serve"
- copy `.env.sample` to `.env`
```
    DATABASE_URL={your environment}
```
- install module `npm install` 
```
    npm install
```
- initial database 
```
    npm run db: init
```
- run app 
```
    npm start
```

### Install JBL app (reactjs)
- directory "/app"
- copy `.env.sample` to `.env.local`
```
    DATABASE_URL={your environment}
```
- install module `npm install` 
```
    npm install
```
- run app 
```
    npm start
```

Enjoy!