## This is a banking application

**Technologies used are**: NodeJs, ExpressJs, MongoDB, Moongoose, Redis and RateLimiting

## Installation

To clone the project:
```bash
https://github.com/Krisliltech/bank_version_API
```
`cd` into the `bank_version_api` directory
```bash
cd bank_version_api
```

create a `.env` file with actual values similar to the `.env-example` file.

install project dependencies
```bash
npm install
```

open another terminal, and run the project
```bash
npm run start
```

## How to use 
first create an .env of using the env-sample format and then proceed to create an admin with a token that was provided as part of the fields in the created .env, 
then create a user using the signup endpoint then the user can fund/credit his/her account through an admin and after which the user can proceed to transfer via. 
The user logs out.

## Endpoints Provided
```
v1/api/signup: to signup
v1/api/login: to login
v1/api/refresh/token: to refresh the user's token
v1/api/credit-acct: to credit account
v1/api/transfer: to transfer funds
v1/api/logout: to logout
```
