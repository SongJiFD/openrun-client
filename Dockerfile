FROM node:14-alpine

COPY . /
WORKDIR /

RUN yarn install --force
RUN yarn build:ssr
CMD yarn start