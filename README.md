This is a basic NodeJs server.
To run this app, we first have to run:

1. npm install: to install the npm modules and their dependencies
2. node index.js: to start the app

Then we use postman to get, post, patch and delete items in the MongoDb database.

The app provides us with two collections:

1. rooms
2. roomTypes

To interact with the rooms collection we use: http://localhost:3000/api/v1/rooms especially when we want to post (add an item to the collection), and get (get all the items in the collection). We use http://localhost:3000/api/v1/rooms/roomId to either patch or delete an item in the collection. With the roomId been the id of the particular room we want to patch (modify) or delete.
To interact with the roomTypes collection we use: http://localhost:3000/api/v1/rooms-types the above rules aplies as well for getting and posting an item in the collection.

The app also makes use of other npm modules such as:

1. mongoose: which help us to interact properly with MongoDb database
2. joi: for data validation
3. joi-objectid: it helps joi to validate a mongoose \_id.
4. dotenv: for getting environmental variables.
5. express: this simplifies the creation of the Restful API
6. nodemon: it actively monitors the app and restarts the app if there is any change in configuration, since node doesn't do this by default

Please note that authentication and authorization is present in the API.
There are two levels of authorization here:

1. The first level is for guest: here guest are general users with an account. Guest can only see the lists of rooms and room types using the get method (with postman and the likes)
2. The second level are admins: admins can add list of rooms (post), edit a room (patch) and of course see the list of rooms(get) they also have the right to delete a room and rom types.

To verify the status of the user, the server checks the req.header and it expects the "x-auth-token" property in it. If not present then the client can't access any of the method. If the token is present It also validates the value of the x-auth-token property, to see if the client is sending the right data.

If the client sends the right token which is only generated after they login or registering, then the user can have the access to the get method, they can see the list of rooms and room-types.

For the client to be able to delete, add or update any of the rooms and room-types they must be an admin. The admin middleware makes sure of this by checking the isAdmin property of the user model (this property can only be set on the database level and not during creation). if the value is true then the user is an admin and can delete.

To test the first level, one can register by sending a post request to the http://localhost:3000/api/v1/users endpoint. the body of the request should contain: name, email and password properties. Once this is done, they can copy the token sent in the header of the response (this token is the value of the x-auth-token property). With this token, create a new property called x-auth-token in the header of the request which will be sent to the server, then proceed to send a get request to the server.

The test the second level, you can send post request to the http://localhost:3000/api/v1/auth endpoint. The request body should contain: {"email": "odira@gmail.com", "password": "12345"}. This is a test admin that have been created at database level. when the request is successful, you will get a token at the body of the request. You can use this token the same way as in the first level test and you will be able to have admin access (i.e. to delete, add and update a room).
