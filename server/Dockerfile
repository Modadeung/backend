
FROM krmp-d2hub-idock.9rum.cc/goorm/node:18 AS deps

WORKDIR /usr/src/modadug/app


COPY ./package*.json yarn.lock nest-cli.json tsconfig.json ./


RUN npm install -g @nestjs/cli && yarn

COPY . .


RUN yarn build


FROM krmp-d2hub-idock.9rum.cc/goorm/node:18 AS runner


WORKDIR /usr/src/modadug/app


COPY --from=deps /usr/src/modadug/app/dist ./dist
COPY --from=deps /usr/src/modadug/app/src/envs ./src/envs
COPY --from=deps /usr/src/modadug/app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", "dist/main"]

