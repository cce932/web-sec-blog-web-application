FROM node:16.0.0

WORKDIR /usr/app

COPY package*.json ./

# is used to install all exact version dependencies or devDependencies from a package-lock
RUN npm ci -qy

COPY . .

EXPOSE 3000

CMD ["npm", "start"]