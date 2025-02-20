FROM krmp-d2hub-idock.9rum.cc/goorm/node:20 AS deps

WORKDIR /usr/src/modadug/app

# 서버 폴더로부터 필요한 파일들을 복사
COPY ./server/package*.json ./server/yarn.lock ./server/nest-cli.json ./server/tsconfig.json ./

# 의존성 설치
RUN npm install -g @nestjs/cli && yarn

# 서버 폴더에서 전체 소스를 복사
COPY ./server ./

# 빌드
RUN yarn build


FROM krmp-d2hub-idock.9rum.cc/goorm/node:20 AS runner

WORKDIR /usr/src/modadug/app

# 빌드한 dist, envs, node_modules 복사
COPY --from=deps /usr/src/modadug/app/dist ./dist
# COPY --from=deps /usr/src/modadug/app/src/envs ./src/envs
COPY --from=deps /usr/src/modadug/app/node_modules ./node_modules

EXPOSE 8080
CMD ["node", "dist/main"]
