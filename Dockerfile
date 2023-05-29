FROM node:19.5.0-alpine
WORKDIR /
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
RUN npm prune --production --force
CMD [ "npm", "run", "start" ]