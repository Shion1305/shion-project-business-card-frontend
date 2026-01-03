FROM node:25-slim

WORKDIR /app

COPY ./.output ./.output

CMD ["node", "./.output/server/index.mjs"]

ENV HOST=0.0.0.0

ENV PORT=8080
