FROM node:20
WORKDIR /
RUN npm install -g npm@9.6.7
ADD package.json package.json
RUN npm install --force
ADD . .
RUN npm run build
RUN npm prune --production --force
CMD [ "npm", "run", "start" ]
