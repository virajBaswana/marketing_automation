FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY . .
CMD [ "node", "dist/index.js" ]
# FROM node:slim

# ENV NODE_ENV production
# USER node

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# RUN npm ci --production

# COPY --from=builder /usr/src/app/dist ./dist