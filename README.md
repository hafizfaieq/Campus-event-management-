# Campus Event Management System

A full-stack mini project for managing university events. It includes a responsive front end, REST APIs, SQLite database, search/filter UI, registration and basic authentication endpoints.

## Technologies
- HTML5, CSS3, JavaScript
- Node.js + Express.js
- SQLite
- Git + GitHub
- Postman

## Repository Structure
- `frontend/` — UI
- `backend/` — REST API and server
- `database/` — SQLite database created at runtime
- `documentation/` — project notes
- `screenshots/` — evidence folder

## Run
1. `cd backend`
2. `npm install`
3. `npm start`
4. Open `frontend/index.html` in a browser.

## API
GET `/api/events`
GET `/api/events/:id`
POST `/api/events`
PUT `/api/events/:id`
DELETE `/api/events/:id`
POST `/api/register`
GET `/api/registrations`
POST `/api/signup`
POST `/api/login`

## GitHub workflow
Use separate feature branches, meaningful commits and pull requests before merging into `main`.
