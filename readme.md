# Running Back End Locally

1. run: `cd ./back-end && npm install && npx prisma generate && npm run start:dev`
2. swagger available at: `localhost:3000/api`

# Running Front End Locally

1. run: `cd ./front-end && npm install && npm run dev`
2. default url is: `localhost:5173`

## Test User

- ID Number: `221519002`
- Password: `123456`

## Back End

### What is used?

- Nestjs
- Prisma - ORM
- JWT
- SQLite

## Front End

### What is used?

- Refine - react framework to build faster

### Architecture

- Modular FSD
  - app - global app inits + routing
  - modules - app modules (auth, customers, etc)
  - shared - things that can be shared across projects (libs, ui-kit, etc)
