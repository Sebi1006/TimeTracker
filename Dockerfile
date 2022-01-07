#### Stage 1: Build the React application
FROM node:17.3.0-alpine as build

# Configure the main working directory inside the Docker image.
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.
COPY package.json package-lock.json ./
RUN npm install

# Copy the main application
COPY . ./

# Arguments
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Build and export the application
RUN npm run export

#### Stage 2: Serve the React application from nginx
FROM nginx:1.21.5-alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the React build from Stage 1
COPY --from=build /app/out /usr/share/nginx/html

# Copy the custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8081 to the Docker host, so we can access it
# from the outside.
EXPOSE 8081

ENTRYPOINT ["nginx","-g","daemon off;"]
