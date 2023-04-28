/* 
    All routes pertaining to the resource: Post
*/

const express = require('express');
const router = express.Router();

let posts = [
    {
        "content" : "Post Content",
        "timeCreated" : "",
        "timeUpdated" : "",
        "status" : "",
        "author" : ""
    }
];

/* 
    CRUD functionalities
*/
// GET - http://localhost:<PORT>/*
router.get( '/', ( request, response ) => {
    response.status( 200 ).send(``);
})

/* 
    Body
    {
        "content" : "Post Content",
        "timeCreated" : "Time created in Date format",
        "timeUpdated" : "Time updated in Date format",
        "status" : "Responsible for soft deletion",
        "author" : "user id of author"
    }
*/
// POST - http://localhost:<PORT>/*
router.post( '/' , ( request, response ) => {
    response.status( 201 ).send(``);
});

// PUT - http://localhost:<PORT>/*
router.put( `/`, ( request, response ) => {
    response.status( 200 ).send(``);
});

// DELETE - http://localhost:<PORT>/*
router.delete( `/`, ( request, response ) => {
    response.status( 200 ).send(``);
})


// Export
module.exports = router;