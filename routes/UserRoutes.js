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
        "email" : "User email",
        "username" : "Username",
        "password" : "User set password"
    }

    Response:
    // On success
    {
        "message" : "User has been successfully registered!"
    }

    // On error
    {
        "error" : "Cannot create user"
    }

    or

    {
        "error" : "Email already exists in the database"
    }
*/
// POST - http://localhost:<PORT>/register
router.post( '/register' , ( request, response ) => {
    // console.log(request.body.email);
    // console.log(request.body.username);
    // console.log(request.body.password);
    if( request.body.email > "" && request.body.username > "" && request.body.password > "" ) {
        
        const username = request.body.username;
        const userFound = users.find( user => user.username.toLowerCase() === username.toLowerCase() );
        if( userFound ){
            response.status( 404 ).send( { error: "Email already exists in the database" } );
        }else{
            users = [ ...users, request.body ];
            console.log(users);
            response.status( 201 ).send( { message: "User has been successfully registered!" } );
        }

    }else{
        response.status( 404 ).send( { error: "Cannot create user" } );
    }
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