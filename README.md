# Latin Bite API

Detta projekt är backend-delen av webbapplikationen Latin Bite.  
API:t är byggt med Node.js, Express och MongoDB och används för att hantera restaurangens meny och autentisering.

API:t innehåller CRUD-funktionalitet för maträtter samt JWT-baserad autentisering för administratörer.

## Publicerat API

https://latin-bite-api.onrender.com/api/menu

## Funktioner

- REST API byggt med Express
- MongoDB-databas med Mongoose
- CRUD-funktionalitet för maträtter
- JWT-autentisering
- Skyddade routes med middleware
- Login och registrering av administratörer
- CORS-stöd
- Deployment med Render

## Teknologier

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- dotenv
- CORS
- Render

## API Routes

### Meny

| Method | Endpoint | Beskrivning |
|---|---|---|
| GET | /api/menu | Hämtar alla maträtter |
| POST | /api/menu | Skapar ny maträtt |
| PUT | /api/menu/:id | Uppdaterar maträtt |
| DELETE | /api/menu/:id | Tar bort maträtt |

### Auth

| Method | Endpoint | Beskrivning |
|---|---|---|
| POST | /api/auth/register | Registrerar admin |
| POST | /api/auth/login | Loggar in admin |

## Installation och körning

Klona projektet:

```bash
git clone https://github.com/Coco10023/latin-bite-api.git
```

Installera dependencies:

```bash
npm install
```

Skapa `.env` fil:

```env
MONGO_URI=din_mongodb_uri
JWT_SECRET=din_hemliga_nyckel
PORT=3000
```

Starta servern:

```bash
npm start
```

Utvecklingsläge med nodemon:

```bash
npm run dev
```

## JWT-autentisering

Skyddade routes kräver JWT-token i headers:

```txt
Authorization: Bearer TOKEN
```
