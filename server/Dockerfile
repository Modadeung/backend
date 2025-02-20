
FROM node:18.12.1-alpine AS deps

WORKDIR /usr/src/modadug/app


COPY ./package*.json yarn.lock nest-cli.json tsconfig.json ./


RUN npm install -g @nestjs/cli && yarn

COPY . .


RUN yarn build


FROM node:18.12.1-alpine AS runner


WORKDIR /usr/src/modadug/app


COPY --from=deps /usr/src/modadug/app/dist ./dist
COPY --from=deps /usr/src/modadug/app/src/envs ./src/envs
COPY --from=deps /usr/src/modadug/app/node_modules ./node_modules

CMD ["node", "dist/main"]
