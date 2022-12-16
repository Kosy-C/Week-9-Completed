FROM node:12-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN npx tsc
CMD ["yarn", "serve"]


