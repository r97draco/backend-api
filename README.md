# Backend Acronym APIs
Rest API for Acronyms.

## How to start
1. Clone or download using link: https://github.com/r97draco/backend-api
<br>```git clone https://github.com/r97draco/backend-api```
2. Run following command to install node modules in the root directory of Project.
<br>```npm install```
3. Run following in terminal to start the server on localhost:3000
<br>```node server.js```

### To run in development mode we can start server using nodemon
4. Run following in terminal to start the server on localhost:3000 using nodemon
<br>```npm run dev```

## API Endpoints
1. GET http://localhost:3000/acronym?search=&limit=100
<br>
It will take 3 Parameters limit, page and search. By deafault it will return limit= 10, page=1 and first 10 Results that are in database.

2. POST http://localhost:3000/acronym
<br> send raw data in body using json format. we can send id but if no id is given it will automatically generate a random one.
<br> Eg: POST call http://localhost:3000/acronym. 
<br> attach raw json { "acronym" ="OMW", "definition": "On my Way" } to the body of the request.
<br> This request will create acronym with a random unique ID and add it to the Database

3. PATCH http://localhost:3000/acronym/
<br> Eg. PATCH call http://localhost:3000/acronym/123  Add id of acronym to be patched at end which 123 
<br> attach json { "acronym" ="lmk", "definition": "Let me Know" } to the body of the request.
<br> This request will update acronym with _id=123 with the given data. 

4. DELETE http://localhost:3000/acronym/
<br> add _id of the acronym to be deleted at the end for eg:-
<br> http://localhost:3000/acronym/123 will delete acronym with id-123 if its present

### Postman json file also has all of these endpoint's ready for testing
Import it as a file the Postman App.<br> postman-file/FulhausBE.postman_collection.json

## File structure :
1. server.js is the root file which will start the server.
2. data.json is where our data is store, change the file content to update the data.
3. routes/acronyms.js is the file containing API routes for /acronym
4. controllers/method.js contains all the function and methods for Database query and manipulation.

## Dependencies
- express@4.18.2
- nodemon@2.0.21
