FROM node:10-alpine

EXPOSE 5000

RUN npm -g install serve

RUN mkdir /var/app
ADD build /var/app
WORKDIR /var/app

ENTRYPOINT ["serve", "-s", "." ]
