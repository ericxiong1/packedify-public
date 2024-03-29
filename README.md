# Packedify
Web application thats list out a user's top tracks & artists in the past 6 months, and enables you to create a playlist based on these top tracks.

## Technologies Used: ##
React (front-end), Express, node.js(backend)
Additional: axios(for easier API calls), query-string, create-react-app

## Running the app ##

This app runs on Node.js.

Once installed, clone the repository and install its dependencies running:

>$ npm install

>$ cd client && npm install

## Using the Spotify Developer Dashboard ##
You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.
Go to your Spotify for Developers Dashboard and create your application, and enter your local development server URI:

http://localhost:PORT/callback

Once you have created your app, load the CLIENT_ID, REDIRECT_URI, and CLIENT_SECRET into the index.js file.

In order to run the app, open the folder, and run its index.js file:

>$ node index.js

In another terminal, run the React front-end:

>$ cd client

>$ npm start

Then, open your local development server. You will need to change all links to your local development server.
