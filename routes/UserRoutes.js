/* 
    All routes pertaining to the resource: User
*/

const express = require('express');
const router = express.Router();

let users = [
    {
        "email" :    "admin@email.com",
        "username" : "admin",
        "password" : "12345"
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
        "email" : "",
        "username" : "",
        "password" : ""
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