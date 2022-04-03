# React x PHP web application

## Usage of complete project.

Please clone this repo and in the project root directory, Please run:

`docker-compose up -d`

"If this command doesn't work, You will need to install docker first "

Frontend will run in localhost:3000
Api will run in localhost:8080

Old way ( If you want to run without docker):

### `npm install`

please go to the /app folder and run npm install to install all the nessery npm modules.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Build this project for production.

## Using only the component

If you want to use only the react component without using php api.
Please download 'src/components/Form/' folder.

You can use the form component like this `<Form config={config} />`

## Run PHP API with docker

First you need docker installed in you machine. Once you have docker installed please
navigate to root folder from your terminal and run:

`docker-compose up -d`

Api will run in localhost:8080
