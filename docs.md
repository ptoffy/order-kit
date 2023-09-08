                









Studente
Matricola
Paul Toffoloni
886733


A.A 2022/2023
Table of Contents

Table of Contents	2
OrderKit	3
Introduction	3
Main Functionalities	4
User Roles	4
Waiter	4
Cook	4
Bartender	4
Cashier	5


OrderKit
Introduction
OrderKit is a comprehensive solution designed to streamline the ordering process in restaurants and similar establishments. The repository is structured into two main components: the API and the UI. The API, written in TypeScript and based on the Node.js framework, provides endpoints for managing orders, users, tables, and menu items. It features controllers for each of these entities, ensuring a modular and maintainable codebase. On the other hand, the UI, also a TypeScript application, more specifically an Angular based SPA (single page application), offers a user-friendly interface for interacting with the system. It's structured into modules for orders, users, and tables, and leverages services to communicate with the API. Additionally, the UI has robust security measures in place, including authentication and authorization guards, as well as a token interceptor for API requests.


Main Functionalities
The project's functionalities are split based on who is using the application. More specifically, each user has a role, which is based on the main roles that we can generally find in a restaurant environment, that grants them access to different areas of the project:
Waiter
Cook
Bartender
Cashier (administrator)
Waiter
The Waiter role is a crucial component of the OrderKit system, bridging the gap between customers and the kitchen or bar. The main responsibilities of a waiter are:
Order Creation: waiters can create orders for their assigned tables. They input the items requested by the customers into the system, which then gets relayed to the kitchen or bar;
Order Monitoring: waiters can view all orders associated with their tables. They can monitor the status of each order, from its creation to its completion;
Order Serving: once an order is ready, waiters are notified and are responsible for serving it to the correct table.
Table Management: waiters are assigned specific tables and are responsible for managing orders for those tables. They can view the status of each table, whether it's occupied or available.
Cook
The Cook's responsibility is to receive, prepare and get back food only orders to the waiters which they can then serve to the customers. Once a cook completes an order, in other words marks it as "Done", a notification gets sent to the waiter of that order's table to serve the order back to the table.
Bartender
The Bartender has essentially the same responsibilities as the cook, the only difference being they don't handle food orders but only drink orders.
Cashier
The cashier is the final role of the whole order flow:
Bill Management: once a table is done with their meal, the cashier can produce the bill for them to pay;
Tables Visualisation: the cashier can view the status of all tables, whether they're occupied or available;
Statistics: there’s some statistics available to the cashier (which can be easily expanded in the future):
Orders amount and revenue for each cook and bartender;
Total amount of profit for a given day (based on the price of the sold items minus their cost);
Best selling items.
User Management: the cashier can manage all users, including waiters, cooks, bartenders, and other cashiers.

## Project Structure 
OrderKit is structured in a client-server architecture, with the client being the UI and the server being the API. The UI is a single page application (SPA) written in TypeScript and based on the Angular framework. The API is also written in TypeScript and based on the Node.js framework.
### The API

#### Routers
The API features routers, which are responsible for handling the requests and responses. The routers use the controllers to handle the requests and responses. The structure of a router is really simple, as it only needs to define the routes and the HTTP methods that they respond to. Here's an example of a router:

#### Controllers
The app is structured into controllers, each of which is responsible for a specific entity. The controllers are then used by the routes, which are responsible for handling the requests and responses. In particular, the API features the following controllers:
Order Controller: responsible for handling requests related to orders, including order creation, order completion, and order retrieval;
User Controller: responsible for handling requests related to users, including user creation, user retrieval, and user deletion;
Table Controller: responsible for handling requests related to tables, including table creation, table retrieval, and table deletion;
Menu Item Controller: responsible for handling requests related to menu items, including menu item creation, menu item retrieval, and menu item deletion.

#### Models
The API also features models, which are used to define the structure of the data that is stored in the database. The models are used by the controllers to create, retrieve, update, and delete data. In particular, the API features the following models:
Order Model: defines the structure of an order, including its items, status, and table;
User Model: defines the structure of a user, including their name, email, password, and role;
Table Model: defines the structure of a table, including its number and status;
Menu Item Model: defines the structure of a menu item, including its name, description, price, and type.
Every model is composed of a schema, which defines the structure of the data, and a model, which is used to interact with the database. Here's an example of a model:

##### Base Model
As you can see, the UserType interface also extends the BaseModelType interface, which defines the structure of the base model. This is done to ensure that all models have an _id which is accessible from the code.

##### DTOs
To be able to interact with the request/response pattern more easily some of the models use the DTO pattern (Data Transfer Object). The DTOs are used to define the structure of the data that is sent in the requests and responses. Additionally, the DTOs can abstract out some useful functionalities without having to modify the models, for example validation. For example:

```
export class CreateOrderRequest {
    @IsNumber()
    @IsNotEmpty()
    table!: number

    @IsNotEmpty()
    items!: { _id: string, count: number }[]

    @IsNotEmpty()
    @IsEnum(MenuItemCategory)
    type!: MenuItemCategory
}
```

#### Middleware

The API also features middleware, which is used to intercept requests and responses. The middleware is used to perform operations on the request/response objects before they reach the controllers, for example, logging or checking for information in the headers.

#### Seeds

The API also features seeds, which are used to populate the database with some initial data. The seeds are used to create some initial data in the database, for example, some users, tables, and menu items. The seeds are run when the application starts, and they can be run again at any time by using the seed command.

### UI 

#### Modules

The UI is structured into modules, each of which is responsible for a specific entity. The most important module is the CoreModule.

##### Core Module

The CoreModule is responsible for all the core functionalities of the application. In particular it contains the following:
    - Guards: the guards are used to protect routes from unauthorized access. The guards are used to check if the user is logged in and if they have the correct role to access the route;
    - Interceptors
    - Services
    - Models and DTOs
    - Components

###### Guards

The guards are used to protect routes from unauthorized access. The guards are used to check if the user is logged in and if they have the correct role to access the route. There's three guards:
- AuthGuard: checks if the user is logged in;
- RoleGuard: checks if the user has the correct role to access the route;
- LoginGuard: checks if the user is logged in and redirects them to the home page if they are.

###### Interceptors

The interceptors are used to intercept HTTP requests and responses. The interceptors are used to add the authorization header to the requests and to handle errors. There's two interceptors:
- TokenInterceptor: adds the authorization header to the requests;
- ErrorInterceptor: handles errors and redirects the user to the error page.

###### Services

The services are used to communicate with the API. The services are used to send requests to the API and to handle the responses. 
One service is slightly different and crucial for the application to work, the API service. The API service is used to send requests to the API and to handle the responses. It's used by all the other services to communicate with the API.

There's a service for each entity:
- OrderService: used to communicate with the Order API;
- UserService: used to communicate with the User API;
- TableService: used to communicate with the Table API;
- MenuItemService: used to communicate with the Menu Item API.

###### Models and DTOs

The models and DTOs are used to define the structure of the data that is sent in the requests and responses. Additionally, the DTOs can abstract out some useful functionalities without having to modify the models, for example validation.
The models are mainly copies from the API, with some minor changes to make them work with the UI. The choice of keeping two separate models is mainly to ensure that API and UI are independent from each other, but also because the models are used in different ways in the API and UI. For example, in the API the models are used to interact with the database, while in the UI they are used to interact with the API.

###### Components

While the other modules are primarily composed of Components, this one contains a few minor components which don't find a home in any other module, like the Navbar, the 404 page, and the notification component.

##### User Module

The user module contains the components regarding the user, in particular:
- Login
- Register
- List
- Edit

##### Home Module

The home module contains the components regarding the home page.

##### Order Module

The order module contains the components regarding the order, in particular:
- Status
- Preparation
- Creation

##### Table Module

The table module contains the components regarding the table, in particular:
- List
- 

### Tech Stack
This part will describe which technologies are being used in the project.

#### API

The backend relies on the following technologies:
- Node.js: a JavaScript runtime environment;
- TypeScript: a typed superset of JavaScript that compiles to plain JavaScript;
- Express.js: a web application framework for Node.js;
- MongoDB: a document-oriented database program;
- Mongoose: an Object Data Modeling (ODM) library for MongoDB and Node.js;
- JWT: a JSON-based open standard for creating access tokens;
- Bcrypt: a password-hashing function;
- Nodemon: a utility that monitors for changes in the code and automatically restarts the server;
- Dotenv: a zero-dependency module that loads environment variables from a .env file into process.env;
- Ts-node: a TypeScript execution engine and REPL for Node.js;
- Morgan: an HTTP request logger middleware for Node.js;
- Winston: a logger for just about everything. Combined with morgan, it logs all the requests and responses to the console;
- Class-validator: a library that allows to use decorators to validate class models;
- CORS: a Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options;
- Socket.io: a JavaScript library for realtime web applications;

#### UI

The frontend relies on the following technologies:
- Angular: a TypeScript-based open-source web application framework;
- TypeScript: a typed superset of JavaScript that compiles to plain JavaScript;
- Bootstrap: a free and open-source CSS framework directed at responsive, mobile-first front-end web development;
- Ng-Bootstrap: a set of native Angular directives for Bootstrap;
- Socket.io-client: a JavaScript library for realtime web applications;
- RxJS: a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code;
- chart.js: a JavaScript library for data visualization;
- ng2-charts: a set of charting components and directives for Angular;

### Security
#### Authentication and Authorization

The application features authentication and authorization, which are used to ensure that only authorized users can access the application. The authentication is handled by the API, which uses JWTs (JSON Web Tokens) to authenticate users. The authorization is handled by the UI, which uses guards to protect routes from unauthorized access, but also by the API, which uses middleware to protect routes from unauthorized access.

The authentication flow is quite elaborate as it aims to be as secure as possible. The flow is as follows:
- The user enters their credentials in the login form and submits the form;
- The UI sends a request to the API to authenticate the user;
- The API checks if the user exists and if the password is correct;
- If the user exists and the password is correct, the API generates a JWT and splits it;

#### CORS

The API also features CORS (Cross-Origin Resource Sharing), which is used to allow the UI to access the API. The CORS is configured to only allow requests from the UI, which is hosted on localhost:4200. Any request coming from a different origin will be rejected.

#### CSP

