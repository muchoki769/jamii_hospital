# Jamii Hospital 
A RESTful API for patient registration and management built with Node.js, Express, and PostgreSQL.

# Features
Patient registration with email validation

Secure password hashing with bcrypt

PostgreSQL database integration

Swagger API documentation

CORS enabled for cross-origin requests

Environment-based configuration

# API Endpoints
POST	/api/register	Register a new patient

GET	/health	API health check

# Installation

```bash
git clone <this-repo-url>

npm install

```
Set up environment variables

Set up PostgreSQL database


#  Running the Application
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# API Documentation
Swagger documentation is available at:

Development: http://localhost:3005/api-docs

Note: Swagger UI is disabled in production by default. To enable it in env:
ENABLE_SWAGGER=true

# Testing the API
curl -X POST http://localhost:3005/api/register -H "Content-Type: application/json" -d '{"name":"yourname","email":"your@gmail.com","password":"your23","confirmpassword":"your23"}'

Using Swagger UI:

Visit http://localhost:3005/api-docs

Find the /api/register endpoint

Click "Try it out"

Fill in the request body

Click "Execute"

# Configuration

Variable	  Description	                  Default
NODE_ENV	  Environment mode	              development
PORT	      Server port	                  3005
DB_USER	      Database user	-
DB_HOST	      Database host	                  localhost
DB_NAME	      Database name	-
DB_PASSWORD	  Database password	-
DB_PORT	      Database port	                   5432
FRONTEND_URL  Frontend URL	                   http://localhost:3005
API_URL	      API base URL	                   http://localhost:3005
ENABLE_SWAGGER	Enable Swagger in production   false

# Health Check
curl http://localhost:3005/health