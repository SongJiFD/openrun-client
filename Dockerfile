FROM node:14-alpine

COPY . /
WORKDIR /

RUN yarn install --network-timeout 100000
CMD yarn dev