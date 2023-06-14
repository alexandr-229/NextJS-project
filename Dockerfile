FROM node:20
WORKDIR /
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production
CMD [ "npm", "run", "start" ]
EXPOSE 3000
