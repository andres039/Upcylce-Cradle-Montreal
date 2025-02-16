# Trash Panda

A web app that allows Montrealers to extend the life of discarded furniture by displaying their location on an interactive map. It addresses the issue of mass piles of perfectly usable items being sent to the landfill and contributing to pollution.

Registered users can indicate their interest in the item by claiming it and marking it as picked up. When adding a new item, the user must click on the map to drop a pin at that location with a popup that contains the information they entered in the form.

## Final Product

![animated demo GIF](https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/demo.gif?raw=true)

![welcome page](https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/welcome_page2.png)

<p align="center">
  <img src="https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/new_item_mobile.png" width=50% height=50% alt="Screenshot of mobile view of new item form">
</p>
<p align="center">
  <img src="https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/map_mobile.png" width=50% height=50% alt="Screenshot of mobile view of map in the new item form">
</p>

![claim item](https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/claim_item.png)

![create new posting](https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/create_new_item.png)

![posted item](https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/posted_item.png)

![available item](https://github.com/andres039/Upcycle-Cradle-Montreal/blob/master/frontend/public/images/available_item.png)

## Project Structure

- Back-End
  - Database
    - Schema
    - Seeds
  - API-Routes
- Front-End
  - Components
  - Helpers
  - Pages
  - Providers
  - Styles

## Trash Panda Frontend

### Setup

*  From the command line go into the frontend directory                                                                                                                    
* Install dependencies with `npm install`

### Front End Dependencies

- "axios": "^0.24.0",
- "dotenv": "^12.0.3",
- "leaflet": "^1.7.1",
- "react": "^17.0.2",
- "react-dom": "^17.0.2",
- "react-leaflet": "^3.2.4",
- "react-router-dom": "^6.2.1",
- "react-scripts": "5.0.0",
- "web-vitals": "^2.1.3"

## Trash Panda Backend

### Setup

*  From the command line go into the backend directory                                                                                                                    
* Install dependencies with `npm install`

### Creating and seeding the Database
 
This project uses PostgreSQL to manage the database, make sure it is already in you machine or [click here to install.](https://www.postgresql.org/download/)                                             
               
1. Create a database with the command `CREATE DATABASE trash_panda;`
2. Copy the `.env.example` file to`.env.development` and fill in the necessary PostgreSQL configuration. For the `TOKEN_KEY` section you can make up your own provisional string inside quotation marks. This is only to initialize the JWT token.
3. Create tables with the command `\i schema/schema.sql;`
4. Seed the tables with initial information with the command `\i seeds/seeds.sql;`

### Run The Server

From the command line go into the backend directory     

Simply start the server with `npm start`. Do the same for the front end directory on a separate terminal.

### API 
   
 
#### Users
                   
`GET /api/users`

Response 
```json                                                              
[
 {
  "id":1,
  "username":"Homer Simpson",
  "email":"homer@nuclearplant.com",
  "password":"$2b$10$z73BvDx35ei1w/tF6aoWu.JQUxRvEbiFu25B072fT3tceZ4sppRWa"
  } 
]         
```       
`POST /register`
                                                     
Body:
```json
[
 {
  "username": "string",
  "email": "string",
  "password": "string"
  }

]
 ```
`POST /login`

Body: 
```json
[
 {
  "email": "string",
  "password": "string"		
  }
]
```
***

#### Pins

`GET /api/pins`

Response
```json
[               
 {
  "id":85,
  "title":"a",
  "description":"a",
  "picture":"a",
  "condition":"New",
  "latitude":45.4877,
  "longitude":-73.5636,
  "date":"2022-01-25T05:00:00.000Z",
  "creator_id":2,
  "claimer_id":null
  }
]

```
`PUT /api/pins/:id` 
   
Body: 
```json 
{
 "current_user_id": "Integer",
 "pinID": "Integer"
}
```
`DELETE /api/pins/:id`                                 

### Dependencies

- "bcrypt": "^5.0.1",
- "cookie-parser": "~1.4.4",
- "cors": "^2.8.5",
- "debug": "~2.6.9",
- "dotenv": "^14.1.0",
- "express": "~4.16.1",
- "jsonwebtoken": "^8.5.1",
- "morgan": "~1.9.1",
- "nodemon": "^2.0.15",
- "npm": "^8.3.1",
- "pg": "^8.7.1"