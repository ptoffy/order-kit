# Orders


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
This will start the frontend, backend and database services. The frontend will be available at `localhost:4200` and the backend at `localhost:3000`.

> :warning: The application relies on an `.env` file to set environment variables. This file is not included in the repository for security reasons. 
If you want to run the application locally, you will need to create this file following the `.env.example` file.

