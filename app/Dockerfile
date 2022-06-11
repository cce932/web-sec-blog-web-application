FROM node:16.0.0

WORKDIR /usr/app

# COPY package*.json ./
COPY package.json ./

# is used to install all exact version dependencies or devDependencies from a package-lock
# RUN npm ci -qy
# RUN npm install -g npm@8.7.0
# RUN npm install --global yarn
RUN yarn install

RUN export REACT_APP_API=http://139.59.96.214:8080

COPY . .

EXPOSE 3000

CMD ["npm", "start"]