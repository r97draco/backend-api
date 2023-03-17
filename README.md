# Backend Acronym APIs
<br>
*Graphical User Interface for lsusb - ElectronJS.*
<br> 

## File structure :
1. server.js is the root file which will start the server.
2. data.json is where our data is store, change the file content to update the data.
3. routes/acronyms.js is the file containing API routes for /acronym
4. controllers/method.js contains all the function and methods for Database query and manipulation.

## How to start
1. Clone or download using link: https://github.com/r97draco/backend-api
2. Run following command to install node modules in the root directory of Project.
<br>```npm install```
3. Run following in terminal to start the server on localhost:3000
<br>```node server.js```

### To run in development mode we can start server using nodemon
4. Run following in terminal to start the server on localhost:3000 using nodemon
<br>```npm run dev```

### Postman file for testing
<br>
Import it as a file the Postman App.
- postman-file/FulhausBE.postman_collection.json

## Dependencies
- express@4.18.2
- nodemon@2.0.21
