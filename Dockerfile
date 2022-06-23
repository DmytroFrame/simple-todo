FROM node:18-alpine

WORKDIR /app

# Copy all the necessary files for build
COPY package*.json tsconfig*.json nest-cli.json ./
COPY src /app/src       

# Install all packages with dev dependencies and build
RUN npm install
RUN npm run build

# Delete all files that are not involved in the service
RUN rm tsconfig*.json && \
    rm nest-cli.json && \
    rm -r src

# Install only the necessary packages
RUN npm install --production

EXPOSE 3000

CMD npm run start:prod
