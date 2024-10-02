![Project Banner](https://github.com/D-Chaney/ideas-api-nodejs-update-file/blob/master/NodeJs_Api_Banner.png?raw=true)

# 📄 ABOUT
This is an application for testing API developement on localhost. The application simply uses NodeJs and ExpressJs to serve an Api that allows users to Get, Post, Put or Delete Ideas. The data in this particular project is stored in a file named IdeasData.js

## TECH STACK
 ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Apache](https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white) 
 

## GETTING STARTED

- Clone this repository to your local computer
  ```
  https://github.com/D-Chaney/ideas-api-nodejs-update-file.git
  ```

- In the .env file, be sure to set your desired port number when running on localhost (currently set to port 3001)

- This application requires [list of dependencies/requirements] to run. You can install them by running the following command:
```
npm install
```

- To run the application, use the following command:
```
npm run serve
```

## USAGE 
- Use an an api testing application to make the http request / api calls (ensure to use the correct port #):
  
  <a href="https://www.postman.com/"><img alt="Static Badge" src="https://img.shields.io/badge/Postman.com-orange?style=for-the-badge&logo=Postman&logoColor=white&labelColor=grey"></a>
  <h4>OR</h4>
  <a href="https://insomnia.rest/"><img alt="Static Badge" src="https://img.shields.io/badge/insomnia.rest-purple?style=for-the-badge&logo=insomnia&logoColor=white&labelColor=grey"></a>

- (Method: GET) - Get all the ideas from the API 
  ```
  localhost:3001/api/v1/ideas/
  ```
- (Method: POST) - Post new idea 
  ```
  localhost:3001/api/v1/ideas/
  ```
- (Method: PUT) - Update a specific idea via Id number
  ```
  localhost:3001/api/v1/ideas/1
  ```

- (Method: DELETE) - Delete one user at a time from the Ideas list via Id number
  ```
  localhost:3001/api/v1/ideas/1
  ```
- (Method: DELETE) - Delete all the ideas at once (used for testing, change passcode if desired)
  ```
  localhost:3001/api/v1/ideas/deleteall/123456
 ```
