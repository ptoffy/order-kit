# OrderKit


This repository contains the source code for the TAW 2023 project. The project is a web application for managing orders in a restaurant. 

## Stack
The application is built using:
 - [Angular](https://angular.io/) as the frontend framework
 - [Node.js](https://nodejs.org/en/) as the backend framework with:
   - [Express](https://expressjs.com/) as routing service
   - [MongoDB](https://www.mongodb.com/) as the database and [Mongoose](https://mongoosejs.com/) as the database driver

## Running the application
The application is designed to be run using `docker-compose`:
```bash
docker-compose up
```

This will start the frontend, backend and database services. 
The frontend will be available at `localhost:4200` and the backend at `localhost:3000`.
The database will be seeded with some initial data: two users for every role:
  - Cassandra Cashier and Cindy Cashier as cashiers, with usernames `cassandra` and `cindy` respectively;
  - Cody Cook and Carl Cook as cooks, with usernames `cody` and `carl` respectively;
  - Brenda Bartender and Bethany Bartender Bartender as bartenders, with usernames `brenda` and `bethany` respectively;
  - Walter Waiter and Wilmer Waiter as waiters, with usernames `walter` and `wilmer` respectively;

All users have the password `password`.

There's also some other data seeded in the database, 6 tables, some menu items and some orders, some tables already have customers and waiters assigned to them, so you can go ahead with the orders flow.
All orders which are seeded are marked as paid and closed, so they won't show up in the orders page, they're just to have some statistics to show.

> [!NOTE]\
> The most interesting way to use the application is to open up different windows in the browser, each one with a different user logged in, this way you can see how notifications and live updates on the order status page work. 

The orders flow is explained in detail in the documentation, but the general idea is that after customers come in, the waiter can occupy a table and assign theirself to it. Aftwerwards they can create an order, then a cook or a bartender work on it, the waiter serves it and finally the cashier closes it.

> [!WARNING]\
> If you're running the application __without__ Docker (e.g. with `npm` directly), the backend relies on an `.env` file to set environment variables. This file is not included in the repository for security reasons. If you want to run the application locally, you will need to create this file following the `.env.example` file.

> [!IMPORTANT]\
> At http://localhost:3000/api-docs/ you can find the Swagger documentation for the backend API.

> [!IMPORTANT]\
> Don't open the frontend using 127.0.0.1! This will cause CORS errors and cookies will not be stored. Always use localhost.


