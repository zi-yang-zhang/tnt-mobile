FROM node:argon

# Install app dependencies
ADD . /tnt-admin
WORKDIR /tnt-admin
RUN npm install


EXPOSE 8080
CMD [ "npm", "start" ]