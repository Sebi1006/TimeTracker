# Frontend

## Quick start

- Make sure your NodeJS and npm versions are up to date for `React 17`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

## Starting the application with custom environment variables

- Linux: `NEXT_PUBLIC_TENANT=time-tracker-free npm run dev`

- Windows CMD: `set "NEXT_PUBLIC_TENANT=time-tracker-free" && npm run dev`

- Powershell: `($env:NEXT_PUBLIC_TENANT = "time-tracker-free") -and (npm run dev)`

- Build (PS): `($env:NEXT_PUBLIC_TENANT = "time-tracker-free") -and ($env:NEXT_PUBLIC_API_URL = "http://127.0.0.1:8080") -and (npm run build)`
