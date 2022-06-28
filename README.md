# Time Tracker Frontend

This is the React frontend project of a cloud-native time tracking tool developed in the class Cloud Application Development at the University of Applied Sciences HTWG Konstanz. The time tracker app is able to track the working hours of each employee in an organization, is highly scalable and can easily be run in the cloud using providers such as AWS.

## Quick start

- Make sure your NodeJS and npm versions are up-to-date for `React 17`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

## Starting the application with custom environment variables

- Linux: `NEXT_PUBLIC_TENANT=time-tracker-free npm run dev`

- Windows CMD: `set "NEXT_PUBLIC_TENANT=time-tracker-free" && npm run dev`

- Powershell: `($env:NEXT_PUBLIC_TENANT = "time-tracker-free") -and (npm run dev)`
