FROM node:current-alpine3.16

COPY scratch-gui .

WORKDIR scratch-gui

RUN npm install

ENTRYPOINT ["npm"]