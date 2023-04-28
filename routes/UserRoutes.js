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

/*
    On Success
    {
        "message" : "Successful login"
    }
    On Error
    {
        "error" : "Invalid credentials"
    } 
*/
// POST - http://localhost:<PORT>/login
router.post( '/login' , ( request, response ) => {
    if( request.body.email > "" && request.body.username > "" && request.body.password > "" ) {
        
        const inputUserEmail = request.body.email;
        const inputUserName = request.body.username;
        const inputUserPassword = request.body.password;

        // const inputUserName = users.find( user => user.username.toLowerCase() === username.toLowerCase() );

        const checkExistingUserIndex = users.findIndex( user => user.username === inputUserName );

        if( checkExistingUserIndex === -1) {
            console.log(checkExistingUserIndex);
            response.status( 404 ).send( { error: "Invalid credentials" } );
        }else{
            console.log(checkExistingUserIndex);
            // console.log(users[checkExistingUserIndex].email);
            // console.log(users[checkExistingUserIndex].username);
            // console.log(users[checkExistingUserIndex].password);
            if( users[checkExistingUserIndex].email === inputUserEmail &&
                users[checkExistingUserIndex].username === inputUserName &&
                users[checkExistingUserIndex].password === inputUserPassword
                ) {
                    response.status( 200 ).send( { message : "Successful login" } );
            }else{
                response.status( 404 ).send( { error: "Invalid credentials" } );
            }
        }

        // console.log('checkExistingUserIndex: ', checkExistingUserIndex);

        // if( inputUserName ){
        //     // response.status( 404 ).send( { error: "Email already exists in the database" } );
        // }else{
        // }
    }else{
        response.status( 404 ).send( { error: "Invalid credentials" } );
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