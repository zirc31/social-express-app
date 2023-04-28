const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 8000;

const server = express();
server.use( bodyParser.json() );
server.use( cors() );

// Routes
const userBaseUrl = '/';
const UserRoutes = require('./routes/UserRoutes');
const postBaseUrl = '/';
const PostRoutes = require('./routes/PostRoutes');

server.get('/', ( request, response ) => {
    response.status( 200 ).send({ message: `Social-Express-App`})
});

server.use( userBaseUrl , UserRoutes );
server.use( postBaseUrl , PostRoutes );

server.listen( PORT, () => {
    console.log(`Server actively listening on port ${PORT}`);
});