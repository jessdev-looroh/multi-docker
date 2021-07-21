FROM node:14.17.3-alpine3.12
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
CMD ["yarn","start"]