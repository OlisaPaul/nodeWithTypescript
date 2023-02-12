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
