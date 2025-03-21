FROM node:18-alpine AS builder


WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install --force


COPY . .


RUN npm run build


FROM node:18-alpine


WORKDIR /app


COPY --from=builder /app/package.json /app/
COPY --from=builder /app/package-lock.json /app/
COPY --from=builder /app/next.config.mjs /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/.env.production /app/


EXPOSE 3000


CMD ["npm", "run", "start"]