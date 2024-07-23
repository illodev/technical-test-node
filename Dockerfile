FROM node:20.15.0-alpine AS dev

WORKDIR /app

ENV NODE_ENV development
ENV PORT 3000

COPY . .

RUN yarn install --frozen-lockfile --non-interactive

EXPOSE 3000

CMD ["yarn", "dev"]